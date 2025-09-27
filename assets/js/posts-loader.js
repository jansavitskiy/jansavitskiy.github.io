class PostsLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.baseUrl = window.location.origin;
    }
    
    async loadPosts(category = null) {
        try {
            const url = category ? `/api/posts/${category}.json` : '/api/posts.json';
            const response = await fetch(url);
            const posts = await response.json();
            
            this.renderPosts(posts);
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    }
    
    renderPosts(posts) {
        this.container.innerHTML = posts.map(post => `
            <article class="post-preview">
                <h3><a href="${post.url}">${post.title}</a></h3>
                <div class="post-excerpt">${post.excerpt}</div>
                <time datetime="${post.date}">${this.formatDate(post.date)}</time>
            </article>
        `).join('');
    }
    
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    }
}