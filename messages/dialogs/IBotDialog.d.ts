/**
 *
 */
export interface IBotDialog {
    id: string;
    name: string;
    dialog: [Function];
    pattern: any;
}
