// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react'
import {FormattedMessage} from 'react-intl';

import Button from '../widgets/buttons/button'
import Dialog from './dialog'
import './confirmationDialogBox.scss'

type ConfirmationDialog = {
    onClose: () => void;
    onConfirm: () => void;
    confirmButtonText:string;
    heading: string;
    subText?: string;
}

type Props = {
    dialogState: ConfirmationDialog
};

export const ConfirmationDialogBox = (props: Props) => {
    return (
        <Dialog className='confirmation-dialog-box' onClose={props.dialogState.onClose}>
            <div className='box-area'>
                <h3 className='heading'>{props.dialogState.heading}</h3>
                <p className='sub-text'>{props.dialogState.subText}</p>

                <div className='action-buttons'>
                    <Button
                        title='cancel-button'
                        active={true}
                        onClick={props.dialogState.onClose}
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
                        onClick={props.dialogState.onConfirm}
                    >
                        {props.dialogState.confirmButtonText}

                    </Button>
                </div>
            </div>
        </Dialog>
    );
};


