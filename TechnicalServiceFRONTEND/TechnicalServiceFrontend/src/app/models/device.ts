export interface Device{
    deviceId : number;
    brandId: number;
    modelId : number;
    groupId : number;
    barkod :string;
    seriNo :string;
    imagePath:string;
    customerId : number;
    takeDate :Date;
    returnDate :Date;
    status : boolean;
    description:string;
}