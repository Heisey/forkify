export default class Likes {
    constructor() {
        this.likes = []
    }

    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        }
        this.likes.push(like)

        // ## Save to local storage
        this.persistData()

        return like
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id)

        // ## Delete from local storage
        this.persistData()

        this.likes.splice(index, 1)
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length
    }

    // ?? Save to Local Storage
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    // ?? Read data from Local Storage
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        if (storage) this.likes = storage
    }
}