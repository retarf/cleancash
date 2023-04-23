import { create, get, list, update } from '../../core/api/requests';

const request = () => {
    const url = "/children";

    return {
        create (data) {
            return create(url, data);
        },
        list () {
            return list(url);
        },
        get (id) {
            return get(url, id);
        },
        update (id, data) {
            return update(url, id, data);
        }
    }
};

const useModel = () => {

    const columns = ["name", "fields"];
    const request = request();

    return {
        columns,
        request
    }
}

export default useModel;