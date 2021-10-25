class ScrollContainer extends HTMLElement {
    constructor() {
        super();

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

    set threshold(value) {
        this.setAttribute( 'threshold', parseFloat( value ) );
    }

    connectedCallback() {

        if( this.hasAttribute( 'watch' ) ) {
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

    }

    disconnectedCallback() {

        if( this.hasAttribute( 'watch' ) ) {
            /**
             * remove the observer
             */
            for (const key in this.children) {

                if (Object.hasOwnProperty.call(this.children, key)) {

                    this._observer.disconnect( this.children[key] );

                }
            }
        }

    }

}

export {
    ScrollContainer
}
