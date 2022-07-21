import View from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline ');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    //Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton(currentPage).nextButton;
    }
    //Last Page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton(currentPage).previousButton;
    }
    //Other page
    if (currentPage < numPages) {
      return `${this._generateMarkupButton(currentPage).previousButton} ${
        this._generateMarkupButton(currentPage).nextButton
      }`;
    }
    //Page 1, and there No other pages
    return '';
  }

  _generateMarkupButton(currentPage) {
    const button = {
      previousButton: `
      <button data-goto="${
        currentPage - 1
      }"class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>`,
      nextButton: `
      <button data-goto="${
        currentPage + 1
      }"class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>`,
    };
    return button;
  }
}

export default new ResultsView();
