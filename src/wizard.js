export default class Wizard {

  /**
   * Create wizard navbar elements.
   *
   * @param {number} amountTabs The amount of tabs will be the reference to
   * knows the amount of nav items that should to be created.
   * @returns {HTMLDivElement} The navbar created.
   */
  static createNavbar(amountTabs) {
    const navbar = document.createElement('div');
    navbar.classList.add('navbar');
    navbar.style.display = 'none';

    const navbarInner = document.createElement('div');
    navbarInner.classList.add('navbar-inner');

    const container = document.createElement('div');
    container.classList.add('container');

    const ul = document.createElement('ul');

    for (let i = 0; i < amountTabs; i++) {
      const li = document.createElement('li');

      const a = document.createElement('a');
      a.href = `#tab${i + 1}`;
      a.setAttribute('data-toggle', 'tab');

      li.appendChild(a);

      ul.appendChild(li);
    }

    container.appendChild(ul);
    navbarInner.appendChild(container);
    navbar.appendChild(navbarInner);

    return navbar;
  }

  /**
   * Create wizard progress bar elements.
   *
   * @returns {HTMLDivElement} The progress bar created.
   */
  static createProgressBar() {
    const bar = document.createElement('div');
    bar.classList.add('progress');
    bar.setAttribute('id', 'bar');

    const content = document.createElement('div');
    content.classList.add('progress-bar');
    content.setAttribute('role', 'progressbar');
    content.setAttribute('aria-valuenow', '0');
    content.setAttribute('aria-valuemin', '0');
    content.setAttribute('aria-valuemax', '100');
    content.style.width = '0%';

    bar.appendChild(content);

    return bar;
  }

  /**
   * Create wizard pager elements.
   *
   * @returns {HTMLUListElement} The pager created.
   */
  static createPager() {
    const pager = document.createElement('ul');
    pager.classList.add('pager', 'wizard');

    // First page item
    const prevFirst = document.createElement('li');
    prevFirst.classList.add('previous', 'first');
    prevFirst.style.display = 'none';

    const firstLink = document.createElement('a');
    firstLink.href = '#';
    firstLink.appendChild(document.createTextNode('First'));

    prevFirst.appendChild(firstLink);

    // Second page item
    const previous = document.createElement('li');
    previous.classList.add('previous');

    const prevLink = document.createElement('a');
    prevLink.href = '#';
    prevLink.appendChild(document.createTextNode('Previous'));

    previous.appendChild(prevLink);

    // Third page item
    const nextLast = document.createElement('li');
    nextLast.classList.add('next', 'last');
    nextLast.style.display = 'none';

    const lastLink = document.createElement('a');
    lastLink.href = '#';
    lastLink.appendChild(document.createTextNode('Last'));

    nextLast.appendChild(lastLink);

    // Fourth page item
    const next = document.createElement('li');
    next.classList.add('next');
    next.addEventListener('click', (() => { getChecked() }).bind());

    const nextLink = document.createElement('a');
    nextLink.href = '#';
    nextLink.setAttribute('id', 'next-submit');
    nextLink.appendChild(document.createTextNode('Next'));

    next.appendChild(nextLink);

    pager.appendChild(prevFirst);
    pager.appendChild(previous);
    pager.appendChild(nextLast);
    pager.appendChild(next);

    return pager;
  }
};
