
import { NextResponse  } from "next/server";
import { dbConnect } from "@/lib/utils";
import Post from "@/models/Post";

export async function GET() {
    try {
        await dbConnect();

        // const session = await getSession({ req });

        // console.log(req);  
        // console.log(session);  

        const posts = await Post.find({}).populate({
            path: 'uploadedBy',
            select: 'name _id image',
        });  

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
