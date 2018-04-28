import Wizard from "./wizard";
import jQuery from "jquery";
import ParamType from "./param-type";
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
      },
      {
        title: 'How many bathrooms are in your home?',
        content: [
          { type: 'radio', content: '1 bathroom' },
          { type: 'radio', content: '2 bathrooms' },
          { type: 'radio', content: '3 bathrooms' },
          { type: 'radio', content: '4 bathrooms' },
          { type: 'radio', content: '5 bathrooms' },
          { type: 'radio', content: '6 bathrooms' },
        ]
      },
      {
        title: 'What is the square footage of your home?',
        content: [
          { type: 'radio', content: 'Less than 1, 000 sq ft' },
          { type: 'radio', content: '1, 000 - 1, 500 sq ft' },
          { type: 'radio', content: '1, 500 - 2, 000 sq ft' },
          { type: 'radio', content: '2, 000 - 2, 500 sq ft' },
          { type: 'radio', content: '2, 500 - 3, 000 sq ft' },
          { type: 'radio', content: '3, 000 - 3, 500 sq ft' },
          { type: 'radio', content: '3, 500 - 4, 000 sq ft' },
          { type: 'radio', content: '4, 000 - 4, 500 sq ft' },
          { type: 'radio', content: '4, 500 - 5, 000 sq ft' },
        ]
      },
      {
        title: 'What kind of cleaning service would you like?',
        subtitle: 'Note: deep cleaning is for houses that are especially dirty or haven’t been cleaned in over a month',
        content: [
          { type: 'radio', content: 'Standard cleaning' },
          { type: 'radio', content: 'Deep cleaning' },
          { type: 'radio', content: 'Move out cleaning' },
        ]
      },
      {
        title: 'Which additional services do you need, if any?',
        subtitle: 'Optional',
        optional: true,
        content: [
          { type: 'checkbox', content: 'Fridge cleaning' },
          { type: 'checkbox', content: 'Oven cleaning' },
          { type: 'checkbox', content: 'Interior window cleaning' },
          { type: 'checkbox', content: 'Laundry' },
        ]
      },
      {
        title: 'Are there any cats or dogs in your house?',
        content: [
          { type: 'radio', content: 'Yes'},
          { type: 'radio', content: 'No'},
        ]
      },
      {
        title: 'When do you need this service?',
        content: [
          { type: 'radio', content: 'In the next few days' },
          { type: 'radio', content: 'Within a week' },
          { type: 'radio', content: 'As recommended by the pro' },
          {
            type: 'radio',
            content: 'Choose date(s)',
            actions: [
              {
                name: 'click',
                function: {
                  name: 'chooseDate',
                  params: [
                    'inputDateWhen',
                  ]
                }
              }
            ]
          },
          {
            wrap: false,
            type: 'date',
            content: '',
            classes: ['min-today', 'form-control'],
            styles: [{ display: 'none' }],
            attributes: [{ id: 'inputDateWhen' }],
          }
        ]
      },
      {
        title: 'When do you need this service?',
        content: [
          { type: 'radio', content: 'Early Morning(before 9am)' },
          { type: 'radio', content: 'Morning(9am - 12pm)' },
          { type: 'radio', content: 'Afternoon(12pm - 3pm)' },
          { type: 'radio', content: 'Late Afternoon(3pm - 6pm)' },
          { type: 'radio', content: 'Evening(after 6pm)' },
        ]
      },
      {
        title: 'How often would you like your house cleaned?',
        content: [
          { type: 'radio', content: 'Just once' },
          { type: 'radio', content: 'Every week' },
          { type: 'radio', content: 'Every 2 weeks' },
          { type: 'radio', content: 'Once a month' },
        ]
      },
      {
        title: 'Anything else the house cleaner should know?',
        subtitle: 'Optional',
        optional: true,
        content: [
          {
            element: 'textarea',
            content: '',
            wrap: false,
            classes: ['form-control'],
            attributes: [
              { rows: 5 },
              { placeholder: 'Tell us more'},
            ],
          }
        ]
      },
      {
        title: 'Please confirm where you need the house cleaner.',
        content: [
          {
            type: 'number',
            content: '',
            wrap: false,
            classes: ['form-control'],
            attributes: [
              { minlength: 5 },
              { maxlength: 5 },
              { placeholder: 'Zip code' },
            ]
          }
        ]
      },
      {
        title: 'Where should we send your matches?',
        content: [
          {
            type: 'email',
            content: '',
            wrap: false,
            classes: ['form-control'],
            attributes: [
              { placeholder: 'Email' },
            ]
          }
        ]
      },
      {
        title: 'Please enter your full name.',
        content: [
          {
            type: 'text',
            content: '',
            wrap: false,
            classes: ['form-control'],
            attributes: [
              { placeholder: 'First and last name' },
            ]
          }
        ]
      },
      {
        title: 'Please enter your phone',
        content: [
          {
            type: 'text',
            content: '',
            wrap: false,
            classes: ['form-control', 'phone-us'],
            attributes: [
              { placeholder: 'Phone number' },
            ]
          }
        ]
      },
      {
        content: [
          {
            element: 'h1',
            wrap: false,
            content: 'Sending request...',
            classes: ['text-center'],
            attributes: [{ id: 'request-loading' }],
          },
          {
            element: 'h1',
            wrap: false,
            content: 'Success! Wait that we will contact you.',
            classes: ['text-center'],
            attributes: [{ id: 'request-success' }],
            styles: [{ display: 'none' }],
          }
        ]
      }
    ];

    this.tabsAmount = this.tabs.length;

    this.setUpWizard();
  }

  /**
   * Set up wizard form definitions.
   */
  setUpWizard() {
    $(document).ready(() => {
      this.generateModal();

      console.log('Document ready');
      $('#rootwizard').bootstrapWizard({
        onTabShow: (tab, navigation, index) => {
          const $total = navigation.find('li').length;
          console.log('total', $total);
          const $current = index + 1;
          console.log('current', $current);
          const $percent = ($current / $total) * 100;
          console.log('percent', $percent);
          $('#rootwizard .progress-bar').css({ width: $percent + '%' });

          const penultimateTab = this.tabsAmount - 1;
          console.log('penultimateTab', penultimateTab);

          console.log('$current === penultimateTab', $current === penultimateTab);
          if ($current == penultimateTab) {
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

  /**
   * Create error element to be used by JQuery validate.
   *
   * @param {string} forAttribute Param with value to be passed to `for` attribute
   * of label element on error element.
   * @returns {HTMLDivElement} The error element.
   */
  errorElement(forAttribute) {
    const div = document.createElement('div');
    div.classList.add('text-center');

    const label = document.createElement('label');
    label.setAttribute('for', forAttribute);
    label.classList.add('error', 'text-center');
    label.style.display = 'none';

    div.appendChild(label);

    return div;
  }

  /**
   * Handle with function params on definitions to check if has any param with
   * definition predefined.
   *
   * @param {array} params
   * @param {object} options
   */
  getFuncParams(params, options = {itemName: ''}) {
    let funcParams = [];
    for (const param of params) {
      if (ParamType.all().includes(param)) {
        if (param === 'FIELD_NAME') {
          funcParams.push(options.itemName);
        } else {
          funcParams.push(param);
        }
      } else {
        funcParams.push(param);
      }
    }

    return funcParams;
  }

  /**
   * Render the form elements.
   */
  render() {
    // Create tab-content div element
    const tabContent = document.createElement('div');
    tabContent.classList.add('tab-content');

    // Create tabs with respectivelly definitions from tabs json
    const tabsAmount = this.tabsAmount;

    for (let i = 0; i < this.tabs.length; i++) {
      // Create title element
      let title = null;
      if (this.tabs[i].title) {
        title = document.createElement('h1');
        title.classList.add('text-center');
        title.appendChild(document.createTextNode(this.tabs[i].title))
      }

      // Creat subtitle if exists
      let subtitle = null;
      if (this.tabs[i].subtitle) {
        subtitle = document.createElement('h2');
        subtitle.classList.add('text-center');
        subtitle.appendChild(document.createTextNode(this.tabs[i].subtitle));
      }

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
      let itemName = '';
      for (let j = 0; j < this.tabs[i].content.length; j++) {
        const item = this.tabs[i].content[j];

        /*
          The default element is a `input`, but if the element option
          was passed on definitions this elemente was used.
        */
        const element = item.element ? item.element : 'input';

        // Set the items name on first iteraction of loop.
        if (j == 0) {
          if (item.type) {
            itemName = `${item.type}${i + 1}`;
          } else {
            itemName = `${element}${i + 1}`;
          }
        }

        // Create
        const input = document.createElement(element);
        if (item.type) {
          input.setAttribute('type', item.type);
        }
        input.setAttribute('name', itemName);

        // Check if field has classes on definitions
        if (item.classes) {
          input.classList.add(...item.classes);
        }

        // Check if has styles attributes.
        if (item.styles) {
          for (const style of item.styles) {
            const key = Object.keys(style)[0];
            input.style[key] = style[key]
          }
        }

        // Check if has optional attributes.
        if (item.attributes) {
          for (const attr of item.attributes) {
            const key = Object.keys(attr)[0];

            input.setAttribute(key, attr[key]);
          }
        }

        // Check if field is optional
        if (!this.tabs[i].optional) {
          input.required = true;
        }
        input.value = item.content;
        input.appendChild(document.createTextNode(item.content));

        // Check if field has actions.
        if (item.actions) {
          for (const action of item.actions) {
            const funcParams = this.getFuncParams(action.function.params, {
              itemName: itemName
            });

            // Assign function with your params to action defined on configs.
            input.addEventListener(action.name, ((...params) => {
              window[action.function.name](funcParams);
            }).bind(...funcParams));
          }
        };

        /*
          Check if on defintions has wrapper option. The default is element
          with wrapper container.
        */
        let elementToAppend = null;
        const hasWrapper = typeof item.wrap !== 'undefined';
        if (! hasWrapper || (hasWrapper && item.wrap === true)) {
          const label = document.createElement('label');
          label.appendChild(input);
          label.appendChild(document.createTextNode(item.content));

          const elementContainer = document.createElement('div');
          elementContainer.classList.add('form-control', item.type);
          elementContainer.appendChild(label);

          elementToAppend = elementContainer;
        } else {
          // If has wrapper with value false.
          elementToAppend = input;
        }

        content.appendChild(elementToAppend);
      }

      content.appendChild(this.errorElement(itemName));

      if (title) {
        tabContainer.appendChild(title);
      }

      if (subtitle) {
        tabContainer.appendChild(subtitle);
      }

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
