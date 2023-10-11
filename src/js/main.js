import { createArray, sleep } from './utils.js';


// Функция для генерации случайного массива
function generateRandomArray() {
    const array = createArray(30); // тут можно указать размер массива
    visualizeArray(array);
}

// Функция для визуализации массива
function visualizeArray(array) {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach(num => {
        const bar = document.createElement('div');
        bar.style.height = `${num}%`; // высота элемента это число в массиве в процентах от родителя
        bar.classList.add('bar');
        container.appendChild(bar);
    });
}

// вспоомогательная функция для анимации
// она принимает два элемента и меняет их местами (высоту одного на высоту другого)
// асинхронная так как внутри есть функция sleep для задержки
async function swap(el1, el2) {
    await sleep(50); 
    const height1 = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = height1;
}

// Алгоритм сортировки пузырьком
async function bubbleSort() {
    const array = Array.from(document.getElementsByClassName('bar')); // получаем массив элементов
    const n = array.length;
    
    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            array[j].style.backgroundColor = 'red'; // подсветка элементов, которые сравниваются
            array[j+1].style.backgroundColor = 'red';
            
            if (parseInt(array[j].style.height) > parseInt(array[j+1].style.height)) {
                await swap(array[j], array[j+1]);
            }
            
            array[j].style.backgroundColor = ''; // сброс подсветки
            array[j+1].style.backgroundColor = '';
        }
    }
}

// Алгоритм сортировки выбором
async function selectionSort() {
    const array = Array.from(document.getElementsByClassName('bar'));
    const n = array.length;

    for (let i = 0; i < n-1; i++) {
        let minIndex = i;
        array[i].style.backgroundColor = 'red'; 

        for (let j = i+1; j < n; j++) {
            array[j].style.backgroundColor = 'yellow';

            await sleep(50);

            if (parseInt(array[j].style.height) < parseInt(array[minIndex].style.height)) {
                minIndex = j;
            }

            array[j].style.backgroundColor = '';
        }

        await swap(array[i], array[minIndex]);

        array[i].style.backgroundColor = '';
    }
}

// Алгоритм сортировки вставками
async function insertionSort() {
    const array = Array.from(document.getElementsByClassName('bar'));
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let key = parseInt(array[i].style.height);
        let j = i - 1;
        array[i].style.backgroundColor = 'red';

        while (j >= 0 && parseInt(array[j].style.height) > key) {
            array[j].style.backgroundColor = 'yellow';
            await sleep(50);
            array[j + 1].style.height = array[j].style.height;
            j = j - 1;
            array[j + 1].style.backgroundColor = '';
        }

        array[j + 1].style.height = `${key}%`;
        array[i].style.backgroundColor = '';
    }
}

// Алгоритм сортировки слиянием
async function mergeSort() {
    const array = Array.from(document.getElementsByClassName('bar'));
    await mergeSortHelper(array, 0, array.length - 1);

    // подход с вспомогательной функцией
    async function mergeSortHelper(array, start, end) {
        if (start < end) {
            const mid = Math.floor((start + end) / 2);
            await mergeSortHelper(array, start, mid);
            await mergeSortHelper(array, mid + 1, end);
            await merge(array, start, mid, end);
        }
    }

    async function merge(array, start, mid, end) {
        let start2 = mid + 1;

        if (parseInt(array[mid].style.height) <= parseInt(array[start2].style.height)) {
            return;
        }

        while (start <= mid && start2 <= end) {
            array[start].style.backgroundColor = 'red';
            array[start2].style.backgroundColor = 'yellow';

            await sleep(50);

            if (parseInt(array[start].style.height) <= parseInt(array[start2].style.height)) {
                array[start].style.backgroundColor = '';
                start++;
            } else {
                let value = array[start2].style.height;
                let index = start2;

                while (index !== start) {
                    array[index].style.height = array[index - 1].style.height;
                    index--;
                    await sleep(50);
                }

                array[start].style.height = value;
                array[start].style.backgroundColor = '';

                start++;
                mid++;
                start2++;
            }
        }

        for (let i = start; i <= mid; i++) {
            array[i].style.backgroundColor = '';
        }
        for (let i = start2; i <= end; i++) {
            array[i].style.backgroundColor = '';
        }
    }
}


// Алгоритм быстрой сортировки
async function quickSort() {
    const array = Array.from(document.getElementsByClassName('bar'));
    
    async function partition(low, high) {
        const pivot = parseInt(array[high].style.height);
        let i = low - 1;

        for (let j = low; j < high; j++) {
            array[j].style.backgroundColor = 'red';
            await sleep(50);

            if (parseInt(array[j].style.height) < pivot) {
                i++;
                await swap(array[i], array[j]);
            }

            array[j].style.backgroundColor = '';
        }

        await swap(array[i + 1], array[high]);

        return i + 1;
    }

    async function sort(low, high) {
        if (low < high) {
            const pi = await partition(low, high);
            await sort(low, pi - 1);
            await sort(pi + 1, high);
        }
    }

    await sort(0, array.length - 1);
}


// просто функция для добавления обработчиков событий
function addEventListeners() {
    const generateRandomArrayButton = document.getElementById('generate-random');
    const bubbleSortButton = document.getElementById('bubble-sort');
    const selectionSortButton = document.getElementById('selection-sort');
    const insertionSortButton = document.getElementById('insertion-sort');
    const mergeSortButton = document.getElementById('merge-sort');
    const quickSortButton = document.getElementById('quick-sort');

    generateRandomArrayButton.addEventListener('click', generateRandomArray);
    bubbleSortButton.addEventListener('click', bubbleSort);
    selectionSortButton.addEventListener('click', selectionSort);
    insertionSortButton.addEventListener('click', insertionSort);
    mergeSortButton.addEventListener('click', mergeSort);
    quickSortButton.addEventListener('click', quickSort);
} 

addEventListeners();
