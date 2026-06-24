document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // EMI Calculator Logic
    const emiForm = document.getElementById('emi-form');
    if (emiForm) {
        emiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const p = parseFloat(document.getElementById('loan-amount').value);
            const r = parseFloat(document.getElementById('interest-rate').value) / 12 / 100;
            const n = parseFloat(document.getElementById('loan-tenure').value) * 12;

            if (p > 0 && r > 0 && n > 0) {
                const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                const totalPayment = emi * n;
                const totalInterest = totalPayment - p;

                showResult('emi-result', `
                    <p>Monthly EMI: <strong>₹${emi.toFixed(2)}</strong></p>
                    <p>Total Interest: <strong>₹${totalInterest.toFixed(2)}</strong></p>
                    <p>Total Payment: <strong>₹${totalPayment.toFixed(2)}</strong></p>
                `);
            } else {
                alert('Please enter valid positive numbers');
            }
        });
    }

    // GST Calculator Logic
    const gstForm = document.getElementById('gst-form');
    if (gstForm) {
        gstForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('amount').value);
            const rate = parseFloat(document.getElementById('gst-rate').value);
            const type = document.getElementById('gst-type').value;

            let gstAmount, netAmount, totalAmount;

            if (type === 'exclusive') {
                gstAmount = (amount * rate) / 100;
                totalAmount = amount + gstAmount;
                showResult('gst-result', `
                    <p>Net Amount: <strong>₹${amount.toFixed(2)}</strong></p>
                    <p>GST Amount: <strong>₹${gstAmount.toFixed(2)}</strong></p>
                    <p>Total Amount: <strong>₹${totalAmount.toFixed(2)}</strong></p>
                `);
            } else {
                gstAmount = amount - (amount * (100 / (100 + rate)));
                netAmount = amount - gstAmount;
                showResult('gst-result', `
                    <p>Net Amount: <strong>₹${netAmount.toFixed(2)}</strong></p>
                    <p>GST Amount: <strong>₹${gstAmount.toFixed(2)}</strong></p>
                    <p>Total Amount: <strong>₹${amount.toFixed(2)}</strong></p>
                `);
            }
        });
    }

    // Age Calculator Logic
    const ageForm = document.getElementById('age-form');
    if (ageForm) {
        ageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const dob = new Date(document.getElementById('dob').value);
            const today = new Date();
            
            if (dob > today) {
                alert('Date of birth cannot be in the future');
                return;
            }

            let ageYears = today.getFullYear() - dob.getFullYear();
            let ageMonths = today.getMonth() - dob.getMonth();
            let ageDays = today.getDate() - dob.getDate();

            if (ageDays < 0) {
                ageMonths--;
                ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            }
            if (ageMonths < 0) {
                ageYears--;
                ageMonths += 12;
            }

            showResult('age-result', `
                <p>Your Age: <strong>${ageYears} Years, ${ageMonths} Months, and ${ageDays} Days</strong></p>
            `);
        });
    }

    // Percentage Calculator Logic
    const percForm = document.getElementById('perc-form');
    if (percForm) {
        percForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);
            const result = (num1 / 100) * num2;
            
            showResult('perc-result', `
                <p>${num1}% of ${num2} is: <strong>${result.toFixed(2)}</strong></p>
            `);
        });
    }

    // Simple Interest Calculator
    const siForm = document.getElementById('si-form');
    if (siForm) {
        siForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const p = parseFloat(document.getElementById('principal').value);
            const r = parseFloat(document.getElementById('rate').value);
            const t = parseFloat(document.getElementById('time').value);
            
            const interest = (p * r * t) / 100;
            const amount = p + interest;

            showResult('si-result', `
                <p>Simple Interest: <strong>₹${interest.toFixed(2)}</strong></p>
                <p>Total Amount: <strong>₹${amount.toFixed(2)}</strong></p>
            `);
        });
    }

    // Compound Interest Calculator
    const ciForm = document.getElementById('ci-form');
    if (ciForm) {
        ciForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const p = parseFloat(document.getElementById('principal-ci').value);
            const r = parseFloat(document.getElementById('rate-ci').value) / 100;
            const t = parseFloat(document.getElementById('time-ci').value);
            const n = parseFloat(document.getElementById('compound-freq').value);
            
            const amount = p * Math.pow((1 + r / n), (n * t));
            const interest = amount - p;

            showResult('ci-result', `
                <p>Compound Interest: <strong>₹${interest.toFixed(2)}</strong></p>
                <p>Total Amount: <strong>₹${amount.toFixed(2)}</strong></p>
            `);
        });
    }

    // BMI Calculator
    const bmiForm = document.getElementById('bmi-form');
    if (bmiForm) {
        const heightUnit = document.getElementById('height-unit');
        const weightUnit = document.getElementById('weight-unit');

        const heightCmGroup = document.getElementById('height-cm-group');
        const heightMGroup = document.getElementById('height-m-group');
        const heightFtGroup = document.getElementById('height-ft-group');

        const weightKgGroup = document.getElementById('weight-kg-group');
        const weightLbGroup = document.getElementById('weight-lb-group');

        function syncHeightUI() {
            const v = heightUnit.value;
            if (v === 'cm') {
                heightCmGroup.style.display = '';
                heightMGroup.style.display = 'none';
                heightFtGroup.style.display = 'none';

                document.getElementById('height-cm').required = true;
                document.getElementById('height-m').required = false;
                document.getElementById('height-ft').required = false;
                document.getElementById('height-inch').required = false;
            } else if (v === 'm') {
                heightCmGroup.style.display = 'none';
                heightMGroup.style.display = '';
                heightFtGroup.style.display = 'none';

                document.getElementById('height-cm').required = false;
                document.getElementById('height-m').required = true;
                document.getElementById('height-ft').required = false;
                document.getElementById('height-inch').required = false;
            } else {
                heightCmGroup.style.display = 'none';
                heightMGroup.style.display = 'none';
                heightFtGroup.style.display = '';

                document.getElementById('height-cm').required = false;
                document.getElementById('height-m').required = false;
                document.getElementById('height-ft').required = true;
                document.getElementById('height-inch').required = true;
            }
        }

        function syncWeightUI() {
            const v = weightUnit.value;
            if (v === 'kg') {
                weightKgGroup.style.display = '';
                weightLbGroup.style.display = 'none';
                document.getElementById('weight-kg').required = true;
                document.getElementById('weight-lb').required = false;
            } else {
                weightKgGroup.style.display = 'none';
                weightLbGroup.style.display = '';
                document.getElementById('weight-kg').required = false;
                document.getElementById('weight-lb').required = true;
            }
        }

        heightUnit.addEventListener('change', syncHeightUI);
        weightUnit.addEventListener('change', syncWeightUI);
        syncHeightUI();
        syncWeightUI();

        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const hu = heightUnit.value;
            let heightMeters;

            if (hu === 'cm') {
                const cm = parseFloat(document.getElementById('height-cm').value);
                heightMeters = cm / 100;
            } else if (hu === 'm') {
                heightMeters = parseFloat(document.getElementById('height-m').value);
            } else {
                const ft = parseFloat(document.getElementById('height-ft').value);
                const inch = parseFloat(document.getElementById('height-inch').value);
                const totalInches = ft * 12 + inch;
                heightMeters = totalInches * 0.0254;
            }

            const wu = weightUnit.value;
            let weightKg;
            if (wu === 'kg') {
                weightKg = parseFloat(document.getElementById('weight-kg').value);
            } else {
                const lb = parseFloat(document.getElementById('weight-lb').value);
                weightKg = lb * 0.45359237;
            }

            if (!(heightMeters > 0) || !(weightKg > 0)) {
                alert('Please enter valid height and weight');
                return;
            }

            const bmi = weightKg / (heightMeters * heightMeters);
            const bmiRounded = bmi.toFixed(2);

            let category = 'Normal';
            // Common general categories
            if (bmi < 18.5) category = 'Underweight';
            else if (bmi < 25) category = 'Normal';
            else if (bmi < 30) category = 'Overweight';
            else category = 'Obese';

            showResult('bmi-result', `
                <p>BMI: <strong>${bmiRounded}</strong></p>
                <p>Category: <strong>${category}</strong></p>
                <p style="font-size:0.95rem; color:#555;">(General guidance only. Consult a professional for medical advice.)</p>
            `);
        });
    }

    // Unit Conversion Calculator
    const unitForm = document.getElementById('unit-form');
    if (unitForm) {
        const categoryEl = document.getElementById('category');
        const fromUnitEl = document.getElementById('from-unit');
        const toUnitEl = document.getElementById('to-unit');
        const valueEl = document.getElementById('unit-value');

        const units = {
            length: [
                { key: 'm', label: 'Meters (m)', toBase: v => v, fromBase: v => v },
                { key: 'km', label: 'Kilometers (km)', toBase: v => v * 1000, fromBase: v => v / 1000 },
                { key: 'cm', label: 'Centimeters (cm)', toBase: v => v / 100, fromBase: v => v * 100 },
                { key: 'mm', label: 'Millimeters (mm)', toBase: v => v / 1000, fromBase: v => v * 1000 },
                { key: 'ft', label: 'Feet (ft)', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
                { key: 'in', label: 'Inches (in)', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
            ],
            weight: [
                { key: 'kg', label: 'Kilograms (kg)', toBase: v => v, fromBase: v => v },
                { key: 'g', label: 'Grams (g)', toBase: v => v / 1000, fromBase: v => v * 1000 },
                { key: 'lb', label: 'Pounds (lb)', toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
                { key: 'oz', label: 'Ounces (oz)', toBase: v => v * 0.028349523125, fromBase: v => v / 0.028349523125 },
            ],
            temperature: [
                { key: 'c', label: 'Celsius (°C)' },
                { key: 'f', label: 'Fahrenheit (°F)' },
                { key: 'k', label: 'Kelvin (K)' },
            ]
        };

        function populateSelect(sel, options) {
            sel.innerHTML = '';
            options.forEach(o => {
                const opt = document.createElement('option');
                opt.value = o.key;
                opt.textContent = o.label || o.key;
                sel.appendChild(opt);
            });
        }

        function refreshUnits() {
            const cat = categoryEl.value;
            const opts = units[cat];
            populateSelect(fromUnitEl, opts);
            populateSelect(toUnitEl, opts);

            // sensible defaults
            if (cat === 'length') {
                fromUnitEl.value = 'm';
                toUnitEl.value = 'km';
            } else if (cat === 'weight') {
                fromUnitEl.value = 'kg';
                toUnitEl.value = 'g';
            } else {
                fromUnitEl.value = 'c';
                toUnitEl.value = 'f';
            }
        }

        refreshUnits();
        categoryEl.addEventListener('change', refreshUnits);

        function convertTemperature(value, from, to) {
            // convert to Celsius first
            let c;
            if (from === 'c') c = value;
            else if (from === 'f') c = (value - 32) * 5 / 9;
            else c = value - 273.15; // k

            // Celsius to target
            if (to === 'c') return c;
            if (to === 'f') return (c * 9 / 5) + 32;
            return c + 273.15; // k
        }

        unitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cat = categoryEl.value;
            const from = fromUnitEl.value;
            const to = toUnitEl.value;
            const val = parseFloat(valueEl.value);

            if (!(val === val) || !isFinite(val)) {
                alert('Enter a valid number');
                return;
            }

            let result;

            if (cat === 'temperature') {
                result = convertTemperature(val, from, to);
            } else {
                const opts = units[cat];
                const fromObj = opts.find(u => u.key === from);
                const toObj = opts.find(u => u.key === to);
                const base = fromObj.toBase(val);
                result = toObj.fromBase(base);
            }

            showResult('unit-result', `
                <p>Result: <strong>${result.toFixed(6).replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1')}</strong></p>
                <p>${val} ${fromUnitEl.options[fromUnitEl.selectedIndex].textContent.replace(/\s*\(.+$/, '')} = ${result} ${toUnitEl.options[toUnitEl.selectedIndex].textContent.replace(/\s*\(.+$/, '')}</p>
            `);
        });
    }

    // Currency Converter (manual rate)
    const currencyForm = document.getElementById('currency-form');
    if (currencyForm) {
        currencyForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fromCurrency = document.getElementById('from-currency').value.trim();
            const toCurrency = document.getElementById('to-currency').value.trim();
            const amount = parseFloat(document.getElementById('currency-amount').value);
            const rate = parseFloat(document.getElementById('rate').value); // To per 1 From

            if (!(amount > 0) || !(rate >= 0)) {
                alert('Enter a valid amount and exchange rate');
                return;
            }

            const converted = amount * rate;

            showResult('currency-result', `
                <p>Converted Amount: <strong>${converted.toFixed(2)}</strong></p>
                <p>${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}</p>
            `);
        });
    }

    function showResult(id, html) {
        const resultBox = document.getElementById(id);
        resultBox.innerHTML = '<h3>Result:</h3>' + html;
        resultBox.style.display = 'block';
    }
});
