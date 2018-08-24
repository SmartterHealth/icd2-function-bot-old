import { Dialog, IDialogWaterfallStep } from 'botbuilder';

/**
 * 
 */
export interface IDialogInfo {
    id:string,
    name: string,
    action: Dialog|IDialogWaterfallStep[]|IDialogWaterfallStep,
    pattern: any;
}