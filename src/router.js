// Router simple pour CongoLibs (ES module)
class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  async handleRoute() {
    let path = window.location.hash.slice(1) || 'onboarding';
    const route = this.routes[path] || this.routes['404'];
    await this.loadPage(route.template);
    this.updateActiveNav(path);
    if (route.onEnter) route.onEnter();
    this.currentRoute = path;
  }

  async loadPage(templatePath) {
    const container = document.getElementById('app-content');
    try {
      const res = await fetch(templatePath, {cache: 'no-store'});
      if (!res.ok) throw new Error('Not found');
      const html = await res.text();
      container.innerHTML = html;
      window.scrollTo(0,0);
    } catch (err) {
      container.innerHTML = `\n        <div class="flex flex-col items-center justify-center min-h-screen p-8">\n          <h1 class="text-2xl font-bold text-red-500 mb-4">Erreur 404</h1>\n          <p class="text-gray-600 mb-4">Page non trouvée</p>\n          <a href="#home" class="px-6 py-3 bg-[#26AD39] text-white rounded-xl">Retour à l'accueil</a>\n        </div>\n      `;
    }
  }

  updateActiveNav(currentPath) {
    document.querySelectorAll('[data-nav-link]').forEach(link => {
      link.classList.remove('text-[#26AD39]', 'bg-[#26AD39]/10');
      link.classList.add('text-gray-500');
    });
    const activeLink = document.querySelector(`[data-nav-link="${currentPath}"]`);
    if (activeLink) {
      activeLink.classList.add('text-[#26AD39]', 'bg-[#26AD39]/10');
      activeLink.classList.remove('text-gray-500');
    }
  }

  navigate(path) {
    window.location.hash = path;
  }
}

const routes = {
  'home': { template: '/public/pages/home.html' },
  'onboarding': { template: '/public/pages/onboarding.html' },
  'signup': { template: '/public/pages/signup.html' },
  'books': { template: '/public/pages/books.html' },
  'gallery': { template: '/public/pages/gallery.html' },
  'profile': { template: '/public/pages/profile.html' },
  '404': { template: '/public/pages/404.html' }
};

export const router = new Router(routes);
export function navigateTo(path) { router.navigate(path); }
