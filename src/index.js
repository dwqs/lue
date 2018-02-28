import Lue from './lue';
import install from './install';

Lue.install = install;

export { mergeActions, mergeProps } from './helpers';
export default Lue;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Lue);
}
