import Post from "../models/post.model.js";

class Authorization {
    hasRole(role) {
        return (req, res, next) => (
            req.principal.roles.includes(role) ? next() : res.status(403).send('Access denied')
        )
    }

    isOwner(paramName) {
        return (req, res, next) => (
            req.principal.username === req.params[paramName] ? next() : res.status(403).send('Access denied')
        )
    }

    isOwnerOrHasRole(paramName, role) {
        return (req, res, next) => {
            const isOwner = req.principal.username === req.params[paramName];
            const hasRole = req.principal.roles.includes(role);
            return isOwner || hasRole ? next() : res.status(403).send('Access denied');
        }
    }

    isPostAuthor(postIdParam) {
        return async (req, res, next) => {
            const postId = req.params[postIdParam];
            const post = await Post.findById(postId);
            if (!post) {
                throw new Error(`Post with id ${id} not found`);
            }
            post.author.toLowerCase() === req.principal.username.toLowerCase() ? next() : res.status(403).send('Access denied');
        }
    }
}

export default new Authorization();