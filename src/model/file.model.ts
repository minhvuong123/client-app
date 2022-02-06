export interface IFile {
  file_id: string;
  file_name: string; // _id of post or comment
  file_size: number;
  file_type: string;
  file_data: string;
}

export interface IEditFile {
  imageUrl: string,
  allowZoomOut: boolean,
  position: { x: number, y: number },
  scale: number,
  rotate: number,
  borderRadius: number,
  preview: any,
  width: number,
  height: number
}