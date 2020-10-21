export const namespaced = true;

export const state = {
    filters: {
        sended: {
            fieldName: 'emails.enviado',
            text: 'Enviado',
            value: false,
            options: [
                {text: '', value: null},
                {text: 'Não', value: false},
                {text: 'Sim', value: true},
            ],
            condition: '='
        },
        returned: {
            fieldName: 'emails.retornado',
            text: 'Retornado',
            value: null,
            options: [
                {text: '', value: null},
                {text: 'Não', value: false},
                {text: 'Sim', value: true},
            ],
            condition: '='
        },
        id: {
            fieldName: 'emails.id',
            text: 'ID',
            value: '',
            condition: '='
        },
        id_task: {
            fieldName: 'emails.id_chamado',
            text: 'ID Chamado',
            value: '',
            condition: '='
        },
        from: {
            fieldName: 'emails.remetente',
            text: 'Remetente',
            value: '',
            type: 'string',
            conditions: [
                { text: 'Igual à', value: '=' },
                { text: 'Contendo', value: 'like' },
            ],
            condition: '='
        },
        to: {
            fieldName: 'emails.dests',
            text: 'Destinatário',
            value: '',
            type: 'string',
            conditions: [
                { text: 'Igual à', value: '=' },
                { text: 'Contendo', value: 'like' },
            ],
            condition: 'like'
        }
    },
    filtersConvertedToQueryParams: {},
    pagination: {
        page: 1,
        total: 10,
        per_page: 10
    },
    sort: {
        sortBy: 'id',
        sortDesc: true,
        sortDirection: 'desc'
    }
}

export const mutations = {
    SET_FILTERS(state, filters) {
        state.filters = filters;
    },

    SET_FILTERS_PARAMS(state) {
        let filters = state.filters;

        let queryParams = [];

        for(let filter in filters) {
            let { fieldName, condition, value} = filters[filter];

            let params = new Array(filter);
            params = [fieldName, condition, value];

            queryParams.push(params)
        }

        state.filtersConvertedToQueryParams = queryParams;
    },

    CLEAR_FILTERS(state) {
        state.filters = {
            sended: {
                fieldName: 'emails.enviado',
                text: 'Enviado',
                value: false,
                options: [
                    {text: '', value: null},
                    {text: 'Não', value: false},
                    {text: 'Sim', value: true},
                ],
                condition: '='
            },
            returned: {
                fieldName: 'emails.retornado',
                text: 'Retornado',
                value: false,
                options: [
                    {text: '', value: null},
                    {text: 'Não', value: false},
                    {text: 'Sim', value: true},
                ],
                condition: '='
            },
            id: {
                fieldName: 'emails.id',
                text: 'ID',
                value: '',
                condition: '='
            },
            id_task: {
                fieldName: 'emails.id_chamado',
                text: 'ID Chamado',
                value: '',
                condition: '='
            },
            from: {
                fieldName: 'emails.remetente',
                text: 'Remetente',
                value: '',
                type: 'string',
                conditions: [
                    { text: 'Igual à', value: '=' },
                    { text: 'Contendo', value: 'like' },
                ],
                condition: '='
            },
            to: {
                fieldName: 'emails.dests',
                text: 'Destinatário',
                value: '',
                type: 'string',
                conditions: [
                    { text: 'Igual à', value: '=' },
                    { text: 'Contendo', value: 'like' },
                ],
                condition: 'like'
            }
        }
    },

    SET_PAGINATION(state, pagination) {
        state.pagination = {
            page: pagination.current_page,
            total: pagination.total,
            per_page: pagination.per_page
        }
    },

    CLEAR_PAGINATION(state) {
        state.pagination = {
            page: 1,
            total: 10,
            per_page: 10
        }
    },

    SET_SORT(state, sort) {
        state.sort = {
            sortBy: sort.sortBy,
            sortDesc: sort.sortDesc,
            sortDirection: sort.sortDesc ? 'desc' : 'asc'
        }
    },

    CLEAR_SORT(state) {
        state.sort = {
            sortBy: 'id',
            sortDesc: true,
            sortDirection: 'desc'
        }
    }
}

export const actions = {
    setFilters({commit}, filters) {
        commit('SET_FILTERS', filters)
        commit('SET_FILTERS_PARAMS');
    },

    clearFilters({commit}) {
        commit('CLEAR_FILTERS');
    },

    setPagination({commit}, pagination) {
        commit('SET_PAGINATION', pagination)
    },

    clearPagination({commit}) {
        commit('CLEAR_PAGINATION');
    },

    setSort({commit}, sort) {
        commit('SET_SORT', sort)
    },

    clearSort({commit}) {
        commit('CLEAR_SORT');
    }
}

export const getters = {
    filters: state => state.filters,
    pagination: state => state.pagination,
    sort: state => state.sort,
    allParams: state => ({
        filters: [...state.filtersConvertedToQueryParams],
        ...state.pagination,
        ...state.sort
    })
}
