// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useState} from 'react'
import {useIntl, FormattedMessage} from 'react-intl'

import {Board, PropertyType, IPropertyTemplate} from '../../blocks/board'
import {Card} from '../../blocks/card'
import {BoardView} from '../../blocks/boardView'
import {ContentBlock} from '../../blocks/contentBlock'
import {CommentBlock} from '../../blocks/commentBlock'
import mutator from '../../mutator'
import Button from '../../widgets/buttons/button'
import MenuWrapper from '../../widgets/menuWrapper'
import PropertyMenu from '../../widgets/propertyMenu'

import PropertyValueElement from '../propertyValueElement'
import {ConfirmationDialogBox} from '../confirmationDialogBox'
import {sendFlashMessage} from '../flashMessages'

type Props = {
    board: Board
    card: Card
    cards: Card[]
    contents: Array<ContentBlock|ContentBlock[]>
    comments: CommentBlock[]
    activeView: BoardView
    views: BoardView[]
    readonly: boolean
}

type ConfirmationDialog = {
    onClose: () => void;
    onConfirm: () => void;
    confirmButtonText:string;
    heading: string;
    subText?: string;
}

const CardDetailProperties = React.memo((props: Props) => {
    const intl = useIntl()
    const {board, card, cards, views, activeView, contents, comments} = props

    const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false)
    const [deletingPropId, setDeletingPropId] = useState<string>('')
    const [deletingPropName, setDeletingPropName] = useState<string>('')

    let [dialogState,setDialogState] = useState<ConfirmationDialog>({heading:'',onClose:()=>{},onConfirm:()=>{},confirmButtonText:''}); 

    return (
        <div className='octo-propertylist CardDetailProperties'>
            {board.fields.cardProperties.map((propertyTemplate: IPropertyTemplate) => {
                const propertyValue = card.fields.properties[propertyTemplate.id]
                return (
                    <div
                        key={propertyTemplate.id + '-' + propertyTemplate.type + '-' + propertyValue}
                        className='octo-propertyrow'
                    >
                        {props.readonly && <div className='octo-propertyname'>{propertyTemplate.name}</div>}
                        {!props.readonly &&
                            <MenuWrapper>
                                <div className='octo-propertyname'><Button>{propertyTemplate.name}</Button></div>
                                <PropertyMenu
                                    propertyId={propertyTemplate.id}
                                    propertyName={propertyTemplate.name}
                                    propertyType={propertyTemplate.type}
                                    onTypeAndNameChanged={(newType: PropertyType, newName: string) => mutator.changePropertyTypeAndName(board, cards, propertyTemplate, newType, newName)}
                                    onDelete={(id: string) => {
                                        setDialogState({heading:'Hello',onConfirm:()=>{},onClose:()=>{},confirmButtonText:'Delte'})
                                        setDeletingPropId(id)
                                        setDeletingPropName(propertyTemplate.name)
                                        setShowConfirmationDialog(true)
                                    }
                                    }
                                />
                            </MenuWrapper>
                        }
                        <PropertyValueElement
                            readOnly={props.readonly}
                            card={card}
                            board={board}
                            contents={contents}
                            comments={comments}
                            propertyTemplate={propertyTemplate}
                            showEmptyPlaceholder={true}
                        />
                    </div>
                )
            })}

            {showConfirmationDialog && 
                <ConfirmationDialogBox
                    propertyId={deletingPropId}
                    onClose={() => setShowConfirmationDialog(false)}
                    onConfirm={() => {
                        mutator.deleteProperty(board, views, cards, deletingPropId)
                        setShowConfirmationDialog(false)
                        sendFlashMessage({content: intl.formatMessage({id: 'CardDetailProperty.property-deleted', defaultMessage: 'Deleted {propertyName} Successfully!'}, {propertyName: deletingPropName}), severity: 'high'})
                    }}

                    heading={intl.formatMessage({id: 'CardDetailProperty.confirm-delete', defaultMessage: 'Confirm Delete Property'})}
                    subText={intl.formatMessage({
                        id: 'CardDetailProperty.confirm-delete-subtext',
                        defaultMessage: 'Are you sure you want to delete the property "{propertyName}"? Deleting it will delete the property from all cards in this board.',
                    },
                    {propertyName: deletingPropName})
                    }
                />
            }

            {!props.readonly &&
                <div className='octo-propertyname add-property'>
                    <Button
                        onClick={async () => {
                            // TODO: Show UI
                            await mutator.insertPropertyTemplate(board, activeView)
                        }}
                    >
                        <FormattedMessage
                            id='CardDetail.add-property'
                            defaultMessage='+ Add a property'
                        />
                    </Button>
                </div>
            }
        </div>
    )
})

export default CardDetailProperties
