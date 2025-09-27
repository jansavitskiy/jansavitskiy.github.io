// Доступ к данным Jekyll
document.addEventListener('DOMContentLoaded', function() {
    // Получаем данные из meta tags
    const siteTitle = document.querySelector('meta[name="site-title"]')?.content;
    const currentPage = document.querySelector('meta[name="page-title"]')?.content;
    
    // Динамическое обновление контента
    updateDynamicContent();
});

function updateDynamicContent() {
    // Пример: обновление даты
    const dateElements = document.querySelectorAll('.dynamic-date');
    dateElements.forEach(el => {
        el.textContent = new Date().toLocaleDateString();
    });
}