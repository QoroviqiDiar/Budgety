// Budget Controller
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: [],
            inc: []
        }
    };

    return {
        addItem: function (type, desc, val) {
            var newItem, ID;

            //get last id and increase for 1
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, val)
            }

            data.allItems[type].push(newItem);
        },

        testing: function () {
            console.log(data);
        }
    };

})();


// UI Controller
var UIController = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
        getInput: function () {

            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        addListItem: function (object, type) {
            var html, newHtml, element;

            if (type === 'inc'){
                element = DOMStrings.incomeContainer;

               html = '<div class="item clearfix" id="income-%id%">\n' +
                '                            <div class="item__description">%description%</div>\n' +
                '                            <div class="right clearfix">\n' +
                '                                <div class="item__value">%value%</div>\n' +
                '                                <div class="item__delete">\n' +
                '                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>';
            } else if (type === 'exp'){
                element = DOMStrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%">\n' +
                    '                            <div class="item__description">%description%</div>\n' +
                    '                            <div class="right clearfix">\n' +
                    '                                <div class="item__value">%value%</div>\n' +
                    '                                <div class="item__percentage">21%</div>\n' +
                    '                                <div class="item__delete">\n' +
                    '                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        </div>';
            }

            newHtml = html.replace('%id%', object.id).replace('%description%', object.description).replace('%value%', object.value);

                document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {

        },

        getDOMStrings: function () {
            return DOMStrings;
        }

    };


})();


// Global App Controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function () {
        var input, newItem;

        input = UICtrl.getInput();
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        UICtrl.addListItem(input, input.type);
    };

    return {
        init: function () {
            console.log('Application has started');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();