document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');
  
  if (!searchInput || !resultsContainer) return;

  fetch('/search.json')
    .then(res => res.json())
    .then(data => {
      // Hide results if clicking outside
      document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
          resultsContainer.style.display = 'none';
        }
      });
      
      searchInput.addEventListener('focus', function() {
        if (resultsContainer.children.length > 0) {
          resultsContainer.style.display = 'block';
        }
      });

      searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        resultsContainer.innerHTML = '';
        
        if (!query) {
          resultsContainer.style.display = 'none';
          return;
        }

        const results = data.filter(post => post.title.toLowerCase().includes(query) || post.category.toLowerCase().includes(query));
        
        if (results.length > 0) {
          resultsContainer.style.display = 'block';
          results.forEach(result => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${result.url}">${result.title}</a>`;
            resultsContainer.appendChild(li);
          });
        } else {
          resultsContainer.style.display = 'block';
          const li = document.createElement('li');
          li.innerHTML = `<a href="#" style="pointer-events: none; color: #999;">Nenhum resultado encontrado</a>`;
          resultsContainer.appendChild(li);
        }
      });
    });
});
