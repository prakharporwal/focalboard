// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react'

import Button from '../widgets/buttons/button'
import Dialog from './dialog'
import './confirmationDialogBox.scss'
import {FormattedMessage} from 'react-intl';

type Props = {
    propertyId: string;
    onClose: () => void;
    onConfirm: () => void;
    heading: string;
    subText?: string;
    dialogState: ConfirmationDialog
};

type ConfirmationDialog = {
    onClose: () => void;
    onConfirm: () => void;
    confirmButtonText:string;
    heading: string;
    subText?: string;
}


export const ConfirmationDialogBox = (props: Props) => {
    return (
        <Dialog className='confirmation-dialog-box' onClose={props.onClose}>
            <div className='box-area'>
                <h3 className='heading'>{props.heading}</h3>
                <p className='sub-text'>{props.subText}</p>

                <div className='action-buttons'>
                    <Button
                        title='cancel-button'
                        active={true}
                        onClick={props.onClose}
                    >
                        <FormattedMessage
                            id='ConfirmationDialog.cancel-action'
                            defaultMessage='Cancel'
                        />
                    </Button>
                    <Button
                        title='delete-button'
                        submit={true}
                        emphasis='danger'
                        onClick={props.onConfirm}
                    >
                        <FormattedMessage
                            id='ConfirmationDialog.delete-action'
                            defaultMessage='Delete'
                        />
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};


