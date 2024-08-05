import Snoowrap from 'snoowrap';
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

    await reddit.getSubreddit('mentalhealth').getHot().map(post => posts.push(new Post(post.title, post.selftext, post.id)))

    for (let post of posts) {
        const comment = await reddit.getSubmission(post.getCommentsID()).comments[0]
        post.topComment = comment;
    }
    console.log(posts)
}
reddit();