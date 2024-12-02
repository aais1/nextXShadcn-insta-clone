import { getSession } from "next-auth/react";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/utils";
import Post from "@/models/Post";

export async function GET(req: NextApiRequest) {
    try {
        await dbConnect();

        const session = await getSession({ req });

        console.log(req);  
        console.log(session);  

        const posts = await Post.find({}).populate({
            path: 'uploadedBy',
            select: 'name _id image',
        });  

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
