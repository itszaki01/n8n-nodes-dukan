import { INodeProperties } from "n8n-workflow";

const showOnlyForGetOneBySku = {
    operation: ['getOneBySku'],
    resource: ['product'],
};

export const getOneBySkuDescription: INodeProperties[] = [
    {
        displayName: 'Product Sku',
        name: 'productSku',
        type: 'string',
        displayOptions: { show: showOnlyForGetOneBySku },
        description: 'The sku of the product to get',
        default: '',
        required: true,
    },
];