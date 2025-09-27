class BlogSearch {
    constructor() {
        this.posts = [];
        this.searchInput = document.getElementById('search-input');
        this.resultsContainer = document.getElementById('search-results');
        
        this.init();
    }
    
    async init() {
        await this.loadPostsData();
        this.setupEventListeners();
    }
    
    async loadPostsData() {
        const response = await fetch('/api/posts.json');
        this.posts = await response.json();
    }
    
    setupEventListeners() {
        this.searchInput.addEventListener('input', this.debounce(this.search.bind(this), 300));
    }
    
    search(event) {
        const query = event.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            this.resultsContainer.innerHTML = '';
            return;
        }
        
        const results = this.posts.filter(post => 
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query)
        );
        
        this.displayResults(results, query);
    }
    
    displayResults(results, query) {
        this.resultsContainer.innerHTML = results.map(post => `
            <div class="search-result">
                <a href="${post.url}">${this.highlightText(post.title, query)}</a>
                <p>${this.highlightText(post.excerpt, query)}</p>
            </div>
        `).join('');
    }
    
    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}