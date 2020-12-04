export interface CompanyEquipment {
  _id: string;
  info: CompanyEquipmentInfo;
  type: string;
  brand: string;
  company: string;
}

export interface CompanyEquipmentInfo {
  model: string;
  serialNumber: string;
  imageUrl: string;
  location: string;
  nfcTag: string;
  qrCode: string;
}
