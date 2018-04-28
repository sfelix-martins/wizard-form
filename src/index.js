import Wizard from "./wizard";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

class App {
  constructor() {
    this.rootWizard = document.getElementById('rootwizard');
    this.btnOpen = document.getElementById('openModal');
    this.tabs = [
      {
        title: 'How many bedrooms are in your home?',
        content: [
          { type: 'radio', content: '1 bedroom' },
          { type: 'radio', content: '2 bedrooms' },
          { type: 'radio', content: '3 bedrooms' },
          { type: 'radio', content: '4 bedrooms' },
          { type: 'radio', content: '5 bedrooms' },
          { type: 'radio', content: '6 bedrooms' },
        ]
      }
    ];

    this.setUpWizard();
  }

  setUpWizard() {
    $(document).ready(() => {
      this.generateModal();

      console.log('Document ready');
      $('#rootwizard').bootstrapWizard({
        onTabShow: (tab, navigation, index) => {
          const $total = navigation.find('li').length;
          const $current = index + 1;
          const $percent = ($current / $total) * 100;
          $('#rootwizard .progress-bar').css({ width: $percent + '%' });

          const latestTab = 14;
          if ($current == latestTab) {
            $('#next-submit').text('Submit');
          } else {
            $('#next-submit').text('Next');
          }
        },
        onNext: (tab, navigation, index) => {
          const $valid = $("#formWizard").valid();
          if (!$valid) {
            return false;
          }
        },
        onPrevious: (tab, navigation, index) => {
          $('#request-loading').show();
          $('#request-success').hide();
          $('#request-error').hide();
        },
      });
    });
  }

  generateModal() {
    this.render();
  }

  render() {
    // Create tab-content div element
    const tabContent = document.createElement('div');
    tabContent.classList.add('tab-content');

    // Create tabs with respectivelly definitions from tabs json
    const tabsAmount = this.tabs.length;

    for (let i = 0; i < this.tabs.length; i++) {
      // Create title element
      const title = document.createElement('h1');
      title.classList.add('text-center');
      title.appendChild(document.createTextNode(this.tabs[i].title))

      // Create tab pane
      const tabPane = document.createElement('div');
      tabPane.classList.add('tab-pane')
      tabPane.setAttribute('id', `tab${i + 1}`);

      // Create tab container
      const tabContainer = document.createElement('div');
      tabContainer.classList.add('container-fluid');

      // Create content container elements
      const content = document.createElement('div');
      content.classList.add('form-group');

      // Create content element
      for (const item of this.tabs[i].content) {
        const input = document.createElement('input');
        input.setAttribute('type', item.type);
        input.setAttribute('name', `${item.type}${i + 1}`);
        input.required = true;
        input.value = item.content;

        const label = document.createElement('label');
        label.appendChild(input);
        label.appendChild(document.createTextNode(item.content));

        const elementContainer = document.createElement('div');
        elementContainer.classList.add('form-control', item.type);
        elementContainer.appendChild(label);

        content.appendChild(elementContainer);
      }

      tabContainer.appendChild(title);
      tabContainer.appendChild(content);

      tabPane.appendChild(tabContainer);

      tabContent.appendChild(tabPane);
    }

    const navbar = Wizard.createNavbar(tabsAmount);
    const progressBar = Wizard.createProgressBar();
    const pager = Wizard.createPager();

    this.rootWizard.appendChild(navbar);
    this.rootWizard.appendChild(progressBar);
    this.rootWizard.appendChild(tabContent);
    this.rootWizard.appendChild(pager);
  }
}

new App;
