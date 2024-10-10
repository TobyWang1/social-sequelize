const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');
const users = require("./seed/users.json");
const profiles = require("./seed/profiles.json");
const posts = require("./seed/posts.json");
const likes = require("./seed/likes.json");
const comments = require("./seed/comments.json");

describe('Social Sequelzie Test', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await db.sync({ force: true });
    })

    // Write your tests here
    
    test("can create a User", async function() {
        await User.bulkCreate(users);
        const foundUser = await User.findByPk(1);
        expect(foundUser).toEqual(expect.objectContaining(users[0]));
    });
    
    test("can create a Profile", async function() {
        await Profile.bulkCreate(profiles);
        const foundProfile = await Profile.findByPk(1);
        expect(foundProfile).toEqual(expect.objectContaining(profiles[0]));
    });

    test("can create a Post", async function() {
        await Post.bulkCreate(posts);
        const foundPost = await Post.findByPk(1);
        expect(foundPost).toEqual(expect.objectContaining(posts[0]));
    });

    test("can create a Comment", async function() {
        await Comment.bulkCreate(comments);
        const foundComment = await Comment.findByPk(1);
        expect(foundComment).toEqual(expect.objectContaining(comments[0]));
    });

    test("can create a Like", async function() {
        await Like.bulkCreate(likes);
        const foundLike = await Like.findByPk(1);
        expect(foundLike).toEqual(expect.objectContaining(likes[0]));
    });

    test("can associate a User with a Profile", async function() {
        const user = await User.create(users[0]);
        const profile = await Profile.create(profiles[0]);
        await user.setProfile(profile);
        const foundProfile = await user.getProfile();
        expect(foundProfile).toEqual(expect.objectContaining(profiles[0]));
    });

    test("can associate a User with a Post", async function() {
        const user = await User.create(users[0]);
        const post = await Post.create(posts[0]);
        await user.addPost(post);
        const foundPosts = await user.getPosts();
        expect(foundPosts).toEqual(expect.arrayContaining([expect.objectContaining(posts[0])]));
    });

    test("can associate a Post with a Comment", async function() {
        const post = await Post.create(posts[0]);
        const comment = await Comment.create(comments[0]);
        await post.addComment(comment);
        const foundComments = await post.getComments();
        expect(foundComments).toEqual(expect.arrayContaining([expect.objectContaining(comments[0])]));
    });

    test("can associate a User with a Like", async function() {
        const user = await User.create(users[0]);
        const like = await Like.create(likes[0]);
        await user.addLike(like);
        const foundLikes = await user.getLikes();
        expect(foundLikes).toEqual(expect.arrayContaining([expect.objectContaining(likes[0])]));
    });
})