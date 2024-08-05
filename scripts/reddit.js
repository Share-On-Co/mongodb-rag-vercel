import Snoowrap from 'snoowrap';
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

class Post {
    title;
    description;
    commentsID;
    topComment
    constructor(title, description, commentsID) {
        this.title = title;
        this.description = description;
        this.commentsID = commentsID;
    }

    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getCommentsID() {
        return this.commentsID;
    }
    getTopComment() {
        return this.topComment;
    }
}

async function reddit() {

    let posts = [];

    const reddit = new Snoowrap({

        userAgent: process.env.USER_AGENT,

        clientId: process.env.CLIENT_ID,

        clientSecret: process.env.CLIENT_SECRET,

        username: process.env.USER_NAME,

        password: process.env.PASSWORD,

    });

    await reddit.getSubreddit('mentalhealth').getTop({time: 'month'}).map(post => posts.push(new Post(post.title, post.selftext, post.id)))
    const client = new MongoClient(process.env.MONGODB_URI);
    const namespace = "share-on.reddit";
    const [dbName, collectionName] = namespace.split(".");
    const collection = client.db(dbName).collection(collectionName);
    posts.shift();
    for (let post of posts) {
        try {
            const comment = await (await reddit.getSubmission(post.getCommentsID()).fetch()).comments[0].body
            post.topComment = comment
        }
        catch (e) {
            
        }
        console.log(post)
        collection.insertOne({ query: `Question: ${post.getTitle() + ' ' +  post.getDescription()} \n + Answer: ${post.getTopComment()}` });

    }

      

}
reddit();