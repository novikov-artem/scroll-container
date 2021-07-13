export default class ScrollContainer extends HTMLElement {
    constructor() {
        super();

        this._items = [];
        this._observer = null;

    }

    get threshold() {
        let threshold = '0.6';

        let customThreshold = this.getAttribute('threshold');
        if( customThreshold ) {
            threshold = parseFloat( customThreshold );
        }

        return threshold;
    }

    connectedCallback() {

        let items = this.querySelectorAll('.scroll-item');
        if( ! items ) return;

        items.forEach( item => this._items.push( item ) );

        const observerSettings = {
            root: this,
            threshold: this.threshold
        }

        if ('IntersectionObserver' in window) {

            const callback = (items, observer) => {

                items.forEach(entry => {

                    entry.target.classList.remove('visible');

                    if (!entry.isIntersecting) {
                        return
                    }
                    entry.target.classList.add('visible');

                })
            }

            this._observer = new IntersectionObserver(callback, observerSettings);
            this._items.forEach( item => this._observer.observe( item ) );

        } else {
            // Fallback
            Array.prototype.forEach.call(items, function (s) {

            })

        }
    }

    disconnectedCallback() {
        /**
         * remove the observer
         */
        this._items.forEach( item => this._observer.unobserve( item ) );
    }

}
