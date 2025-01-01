export type UploadPostProps = {
    desc : string;
    imagesUrl : string[];
    uploadedBy : string;
}

export type PostType={
    createdAt: Date;
    description: string;
    imagesUrl: string[];
    likes: number[];
    comments?: string[];
    uploadedBy: {
      name: string;
      avatar?: string;
    }
}