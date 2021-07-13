export default class ScrollContainer extends HTMLElement {
    _observer = null;
    constructor() {
        super();

    }

    get threshold() {
        let threshold = '0.6';

        let customThreshold = this.getAttribute('threshold');
        if( customThreshold ) {
            threshold = parseFloat( customThreshold );
        }

        return threshold;
    }

    set threshold(value) {
        this.setAttribute( 'threshold', parseFloat( value ) );
    }

    connectedCallback() {

        const observerSettings = {
            root: this,
            threshold: this.threshold
        }

        if ('IntersectionObserver' in window) {

            const callback = (items, observer) => {

                items.forEach(entry => {

                    let element = entry.target;

                    element.classList.remove('visible');

                    if (!entry.isIntersecting) {
                        return;
                    }

                    element.classList.add('visible');

                })
            }

            this._observer = new IntersectionObserver(callback, observerSettings)

            for (const key in this.children) {

                if (Object.hasOwnProperty.call(this.children, key)) {

                    this._observer.observe( this.children[key] );

                }
            }

        } else {

            // Fallback ???
            Array.prototype.forEach.call(this.children, function (s) {

            })

        }
    }

    disconnectedCallback() {

        /**
         * remove the observer
         */
        for (const key in this.children) {

            if (Object.hasOwnProperty.call(this.children, key)) {

                this._observer.observe( this.children[key] );

            }
        }

    }

}
