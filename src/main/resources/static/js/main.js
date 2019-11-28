let counterApi = Vue.resource('/counter{/name}')

Vue.component('counter-form', {
    props: ["counters"],
    data: function() {
        return {
            name: '',
            value: 0
        }
    },
    template: '<div class="container">' +
        '<h4 class="text-center">Добавление счетчика</h4>' +
        '<div class="form-group">' +
            '<label for="counterName">Имя счетчика</label>' +
            '<input type="text" class="form-control" id="counterName" aria-describedby="counterNameHelp" placeholder="Имя счетчика" v-model="name">' +
         '</div>' +
         '<button class="btn btn-primary" @click="save">Сохранить</button>' +
         '<hr>' +
    '</div>',
    methods: {
        save: function() {
            let counter = { name: this.name, value: this.value }
            counterApi.save({}, counter).then(
                result => result.json().then(data => {
                    if (data.name !== '') {
                        this.counters.push(data)
                        this.name = ''
                    }
                })
            )
        }
    }
})

Vue.component('all-quantity-form', {
    props: ['quantity'],
    template: '<div class="container">' +
        '<h4 class="text-center">Получить суммарное значение всех счетчиков</h4>' +
        '<div class="d-flex">' +
            '<button class="btn btn-primary" @click="getAllQuantity">Получить</button>' +
            '<strong class="mx-5">Общее количество:</strong>' +
            '<i>{{quantity}}</i>' +
        '</div>' +
        '<hr>' +
    '</div>',
    methods: {
        getAllQuantity: function() {
            counterApi.get({name: "allQuantity"}).then(
                result => result.json().then(data => {
                    if (result.ok) {
                        this.quantity = data
                    }
                })
            )
        }
    }
})

Vue.component('counter', {
    props: ['counter', "counters"],
    data: function() {
        return {
            name: '',
        }
    },
    template: '<div class="d-flex">' +
        '<div class="alert alert-primary m-1 flex-grow-1" role="alert">' +
            '<strong>{{counter.name}}</strong> ' +
            '<span>{{counter.value}}</span>' +
        '</div>' +
        '<button class="btn btn-primary m-1" @click="increase">Увеличить</button>' +
        '<button class="btn btn-primary m-1" @click="decrease">Уменьшить</button>' +
        '<button class="btn btn-danger m-1" @click="deleteCounter">Удалить</button>' +
    '</div>',
    methods: {
        deleteCounter: function() {
            counterApi.remove({name: this.counter.name}).then(result => {
                if (result.ok) {
                    this.counters.splice(this.counters.indexOf(this.counter), 1)
                }
            })
        },
        increase: function(event) {
            counterApi.update({name: this.counter.name}, {operation: 'increment'}).then(result => {
                if (result.ok) {
                    this.counter.value++
                }
            })
        },
        decrease: function() {
            counterApi.update({name: this.counter.name}, {operation: 'decrement'}).then(result => {
                if ((result.ok) && (this.counter.value > 0)) {
                    this.counter.value--
                }
             })
        }
    }
})

Vue.component('counters-list', {
    props: ['counters'],
    template: '<div class="container">' +
        '<counter-form :counters="counters" />' +
        '<all-quantity-form />' +
        '<h4 class="text-center">Счетчики</h4>' +
        '<counter v-for="counter in counters" :counter="counter" :counters="counters" />' +
    '</div>',
    created: function() {
        counterApi.get().then(result =>
            result.json().then(data =>
                data.forEach(counter => this.counters.push(counter))
            )
        )
      }
})

var app = new Vue({
    el: '#app',
    template: '<counters-list :counters="counters" />',
    data: {
        counters: []
    }
});