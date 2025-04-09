// الرسوم البيانية المتقدمة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة الرسوم البيانية
    initAdvancedCharts();
});

// ===== تهيئة الرسوم البيانية المتقدمة =====
function initAdvancedCharts() {
    // تهيئة مخطط الطلب المتوقع
    initDemandChart();
    
    // تهيئة مخطط الإيرادات والتكاليف
    initRevenueExpenseChart();
    
    // تهيئة مخطط التدفق النقدي
    initCashFlowChart();
    
    // تهيئة مخطط نقطة التعادل
    initBreakEvenChart();
    
    // تهيئة مخطط تحليل الحساسية
    initSensitivityChart();
    
    // تهيئة مخطط المنافسين
    initCompetitorsChart();
    
    // تهيئة مخطط المؤشرات المالية
    initFinancialIndicatorsChart();
    
    // تهيئة مخطط تحليل SWOT
    initSwotChart();
    
    // إضافة مستمعي الأحداث للرسوم البيانية
    setupChartEventListeners();
}

// ===== تهيئة مخطط الطلب المتوقع =====
function initDemandChart() {
    const demandCtx = document.getElementById('demand-chart');
    
    if (demandCtx) {
        // تهيئة مخطط الطلب المتوقع باستخدام Chart.js
        window.demandChart = new Chart(demandCtx, {
            type: 'bar',
            data: {
                labels: ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة', 'السنة الرابعة', 'السنة الخامسة'],
                datasets: [{
                    label: 'الطلب المتوقع',
                    data: [500, 750, 1000, 1250, 1500],
                    backgroundColor: [
                        'rgba(93, 92, 222, 0.5)',
                        'rgba(93, 92, 222, 0.6)',
                        'rgba(93, 92, 222, 0.7)',
                        'rgba(93, 92, 222, 0.8)',
                        'rgba(93, 92, 222, 0.9)'
                    ],
                    borderColor: [
                        'rgba(93, 92, 222, 1)',
                        'rgba(93, 92, 222, 1)',
                        'rgba(93, 92, 222, 1)',
                        'rgba(93, 92, 222, 1)',
                        'rgba(93, 92, 222, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + ' وحدة';
                            }
                        }
                    },
                    datalabels: {
                        color: '#fff',
                        font: {
                            weight: 'bold'
                        },
                        formatter: function(value) {
                            return value + ' وحدة';
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'عدد الوحدات'
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
        
        // إضافة مستمعي الأحداث لشرائح التمرير
        const demandSliders = document.querySelectorAll('[id^="demand-year"]');
        const demandValues = document.querySelectorAll('[id$="-value"]');
        
        if (demandSliders.length > 0) {
            demandSliders.forEach((slider, index) => {
                slider.addEventListener('input', function() {
                    if (demandValues[index]) {
                        demandValues[index].textContent = this.value;
                    }
                    updateDemandChart();
                });
            });
        }
    }
}

// تحديث مخطط الطلب المتوقع
function updateDemandChart() {
    if (window.demandChart) {
        // جمع البيانات من شرائح التمرير
        const demandData = [];
        const demandSliders = document.querySelectorAll('[id^="demand-year"]');
        
        demandSliders.forEach(slider => {
            demandData.push(parseInt(slider.value));
        });
        
        // تحديث بيانات المخطط
        window.demandChart.data.datasets[0].data = demandData;
        
        // تحديث المخطط
        window.demandChart.update();
        
        // تحديث البيانات المالية
        updateFinancialData();
    }
}

// ===== تهيئة مخطط الإيرادات والتكاليف =====
function initRevenueExpenseChart() {
    const revenueExpenseCtx = document.getElementById('revenue-expense-chart');
    
    if (revenueExpenseCtx) {
        // تهيئة مخطط الإيرادات والتكاليف باستخدام Chart.js
        window.revenueExpenseChart = new Chart(revenueExpenseCtx, {
            type: 'bar',
            data: {
                labels: ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة', 'السنة الرابعة', 'السنة الخامسة'],
                datasets: [
                    {
                        label: 'الإيرادات',
                        data: [100000, 150000, 200000, 250000, 300000],
                        backgroundColor: 'rgba(46, 184, 92, 0.7)',
                        borderColor: 'rgba(46, 184, 92, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'التكاليف',
                        data: [80000, 100000, 120000, 140000, 160000],
                        backgroundColor: 'rgba(229, 83, 83, 0.7)',
                        borderColor: 'rgba(229, 83, 83, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + ' $';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'القيمة ($)'
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// تحديث مخطط الإيرادات والتكاليف
function updateRevenueExpenseChart(revenueData, expenseData) {
    if (window.revenueExpenseChart) {
        // تحديث بيانات المخطط
        window.revenueExpenseChart.data.datasets[0].data = revenueData;
        window.revenueExpenseChart.data.datasets[1].data = expenseData;
        
        // تحديث المخطط
        window.revenueExpenseChart.update();
    }
}

// ===== تهيئة مخطط التدفق النقدي =====
function initCashFlowChart() {
    const cashFlowCtx = document.getElementById('cash-flow-chart');
    
    if (cashFlowCtx) {
        // تهيئة مخطط التدفق النقدي باستخدام Chart.js
        window.cashFlowChart = new Chart(cashFlowCtx, {
            type: 'line',
            data: {
                labels: ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة', 'السنة الرابعة', 'السنة الخامسة'],
                datasets: [
                    {
                        label: 'التدفق النقدي',
                        data: [20000, 50000, 80000, 110000, 140000],
                        backgroundColor: 'rgba(93, 92, 222, 0.2)',
                        borderColor: 'rgba(93, 92, 222, 1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: 'rgba(93, 92, 222, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: 'التدفق النقدي التراكمي',
                        data: [20000, 70000, 150000, 260000, 400000],
                        backgroundColor: 'rgba(46, 184, 92, 0.2)',
                        borderColor: 'rgba(46, 184, 92, 1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: 'rgba(46, 184, 92, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + ' $';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'القيمة ($)'
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// تحديث مخطط التدفق النقدي
function updateCashFlowChart(cashFlowData) {
    if (window.cashFlowChart) {
        // حساب التدفق النقدي التراكمي
        const cumulativeCashFlow = [];
        let cumulative = 0;
        
        cashFlowData.forEach(value => {
            cumulative += value;
            cumulativeCashFlow.push(cumulative);
        });
        
        // تحديث بيانات المخطط
        window.cashFlowChart.data.datasets[0].data = cashFlowData;
        window.cashFlowChart.data.datasets[1].data = cumulativeCashFlow;
        
        // تحديث المخطط
        window.cashFlowChart.update();
    }
}

// ===== تهيئة مخطط نقطة التعادل =====
function initBreakEvenChart() {
    const breakEvenCtx = document.getElementById('break-even-chart');
    
    if (breakEvenCtx) {
        // تهيئة مخطط نقطة التعادل باستخدام Chart.js
        window.breakEvenChart = new Chart(breakEvenCtx, {
            type: 'line',
            data: {
                labels: Array.from({ length: 11 }, (_, i) => i * 100),
                datasets: [
                    {
                        label: 'الإيرادات',
                        data: Array.from({ length: 11 }, (_, i) => i * 100 * 10),
                        backgroundColor: 'rgba(46, 184, 92, 0.2)',
                        borderColor: 'rgba(46, 184, 92, 1)',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'التكاليف الثابتة',
                        data: Array.from({ length: 11 }, () => 50000),
                        backgroundColor: 'rgba(229, 83, 83, 0.2)',
                        borderColor: 'rgba(229, 83, 83, 1)',
                        borderWidth: 2,
                        fill: false,
                        borderDash: [5, 5]
                    },
                    {
                        label: 'إجمالي التكاليف',
                        data: Array.from({ length: 11 }, (_, i) => 50000 + i * 100 * 5),
                        backgroundColor: 'rgba(93, 92, 222, 0.2)',
                        borderColor: 'rgba(93, 92, 222, 1)',
                        borderWidth: 2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + ' $';
                            }
                        }
                    },
                    annotation: {
                        annotations: {
                            breakEvenPoint: {
                                type: 'point',
                                xValue: 500,
                                yValue: 75000,
                                backgroundColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 3,
                                borderColor: 'white',
                                radius: 8,
                                label: {
                                    content: 'نقطة التعادل',
                                    enabled: true,
                                    position: 'top',
                                    font: {
                                        weight: 'bold'
                                    }
                                }
                            },
                            breakEvenLine: {
                                type: 'line',
                                xMin: 500,
                                xMax: 500,
                                yMin: 0,
                                yMax: 75000,
                                borderColor: 'rgba(255, 99, 132, 0.5)',
                                borderWidth: 2,
                                borderDash: [5, 5]
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'عدد الوحدات'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'القيمة ($)'
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// تحديث مخطط نقطة التعادل
function updateBreakEvenChart(fixedCosts, unitPrice, unitCost) {
    if (window.breakEvenChart) {
        // حساب نقطة التعادل
        const breakEvenUnits = fixedCosts / (unitPrice - unitCost);
        const breakEvenValue = breakEvenUnits * unitPrice;
        
        // إنشاء بيانات المخطط
        const maxUnits = Math.ceil(breakEvenUnits * 2);
        const unitStep = Math.ceil(maxUnits / 10);
        const labels = Array.from({ length: 11 }, (_, i) => i * unitStep);
        
        const revenueData = labels.map(units => units * unitPrice);
        const fixedCostsData = labels.map(() => fixedCosts);
        const totalCostsData = labels.map(units => fixedCosts + units * unitCost);
        
        // تحديث بيانات المخطط
        window.breakEvenChart.data.labels = labels;
        window.breakEvenChart.data.datasets[0].data = revenueData;
        window.breakEvenChart.data.datasets[1].data = fixedCostsData;
        window.breakEvenChart.data.datasets[2].data = totalCostsData;
        
        // تحديث تعليق نقطة التعادل
        window.breakEvenChart.options.plugins.annotation.annotations.breakEvenPoint.xValue = breakEvenUnits;
        window.breakEvenChart.options.plugins.annotation.annotations.breakEvenPoint.yValue = breakEvenValue;
        window.breakEvenChart.options.plugins.annotation.annotations.breakEvenLine.xMin = breakEvenUnits;
        window.breakEvenChart.options.plugins.annotation.annotations.breakEvenLine.xMax = breakEvenUnits;
        window.breakEvenChart.options.plugins.annotation.annotations.breakEvenLine.yMax = breakEvenValue;
        
        // تحديث المخطط
        window.breakEvenChart.update();
    }
}

// ===== تهيئة مخطط تحليل الحساسية =====
function initSensitivityChart() {
    const sensitivityCtx = document.getElementById('sensitivity-chart');
    
    if (sensitivityCtx) {
        // تهيئة مخطط تحليل الحساسية باستخدام Chart.js
        window.sensitivityChart = new Chart(sensitivityCtx, {
            type: 'line',
            data: {
                labels: ['-20%', '-10%', '0%', '+10%', '+20%'],
                datasets: [
                    {
                        label: 'الإيرادات',
                        data: [80000, 90000, 100000, 110000, 120000],
                        backgroundColor: 'rgba(46, 184, 92, 0.2)',
                        borderColor: 'rgba(46, 184, 92, 1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.1,
                        pointBackgroundColor: 'rgba(46, 184, 92, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: 'التكاليف',
                        data: [120000, 110000, 100000, 90000, 80000],
                        backgroundColor: 'rgba(229, 83, 83, 0.2)',
                        borderColor: 'rgba(229, 83, 83, 1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.1,
                        pointBackgroundColor: 'rgba(229, 83, 83, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: 'معدل الخصم',
                        data: [110000, 105000, 100000, 95000, 90000],
                        backgroundColor: 'rgba(93, 92, 222, 0.2)',
                        borderColor: 'rgba(93, 92, 222, 1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.1,
                        pointBackgroundColor: 'rgba(93, 92, 222, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + ' $';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'صافي القيمة الحالية ($)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'نسبة التغيير'
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// تحديث مخطط تحليل الحساسية
function updateSensitivityChart(sensitivityData) {
    if (window.sensitivityChart && sensitivityData) {
        // تحديث بيانات المخطط
        window.sensitivityChart.data.datasets.forEach((dataset, index) => {
            if (sensitivityData[index]) {
                dataset.data = sensitivityData[index];
            }
        });
        
        // تحديث المخطط
        window.sensitivityChart.update();
    }
}

// ===== تهيئة مخطط المنافسين =====
function initCompetitorsChart() {
    const competitorsCtx = document.getElementById('competitors-chart');
    
    if (competitorsCtx) {
        // تهيئة مخطط المنافسين باستخدام Chart.js
        window.competitorsChart = new Chart(competitorsCtx, {
            type: 'radar',
            data: {
                labels: ['جودة المنتج', 'السعر', 'خدمة العملاء', 'التسويق', 'الابتكار', 'الحصة السوقية'],
                datasets: [
                    {
                        label: 'مشروعنا',
                        data: [4.5, 4.0, 4.2, 3.8, 4.7, 3.5],
                        backgroundColor: 'rgba(93, 92, 222, 0.2)',
                        borderColor: 'rgba(93, 92, 222, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(93, 92, 222, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: 'المنافس الأول',
                        data: [4.0, 3.5, 3.8, 4.2, 3.5, 4.0],
                        backgroundColor: 'rgba(46, 184, 92, 0.2)',
                        borderColor: 'rgba(46, 184, 92, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(46, 184, 92, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: 'المنافس الثاني',
                        data: [3.8, 4.2, 3.5, 3.0, 3.2, 3.8],
                        backgroundColor: 'rgba(229, 83, 83, 0.2)',
                        borderColor: 'rgba(229, 83, 83, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(229, 83, 83, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.r + ' / 5';
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        min: 0,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        },
                        pointLabels: {
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// تحديث مخطط المنافسين
function updateCompetitorsChart(competitorsData) {
    if (window.competitorsChart && competitorsData) {
        // تحديث بيانات المخطط
        window.competitorsChart.data.datasets.forEach((dataset, index) => {
            if (competitorsData[index]) {
                dataset.data = competitorsData[index];
            }
        });
        
        // تحديث المخطط
        window.competitorsChart.update();
    }
}

// ===== تهيئة مخطط المؤشرات المالية =====
function initFinancialIndicatorsChart() {
    const financialIndicatorsCtx = document.getElementById('financial-indicators-chart');
    
    if (financialIndicatorsCtx) {
        // تهيئة مخطط المؤشرات المالية باستخدام Chart.js
        window.financialIndicatorsChart = new Chart(financialIndicatorsCtx, {
            type: 'bar',
            data: {
                labels: ['ROI', 'IRR', 'فترة الاسترداد', 'نقطة التعادل'],
                datasets: [
                    {
                        label: 'القيمة الفعلية',
                        data: [25, 22, 3.5, 500],
                        backgroundColor: [
                            'rgba(46, 184, 92, 0.7)',
                            'rgba(93, 92, 222, 0.7)',
                            'rgba(229, 83, 83, 0.7)',
                            'rgba(255, 159, 64, 0.7)'
                        ],
                        borderColor: [
                            'rgba(46, 184, 92, 1)',
                            'rgba(93, 92, 222, 1)',
                            'rgba(229, 83, 83, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'القيمة المستهدفة',
                        data: [20, 18, 4, 600],
                        backgroundColor: [
                            'rgba(46, 184, 92, 0.3)',
                            'rgba(93, 92, 222, 0.3)',
                            'rgba(229, 83, 83, 0.3)',
                            'rgba(255, 159, 64, 0.3)'
                        ],
                        borderColor: [
                            'rgba(46, 184, 92, 1)',
                            'rgba(93, 92, 222, 1)',
                            'rgba(229, 83, 83, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label;
                                const value = context.parsed.y;
                                const index = context.dataIndex;
                                
                                if (index === 0 || index === 1) {
                                    return label + ': ' + value + '%';
                                } else if (index === 2) {
                                    return label + ': ' + value + ' سنوات';
                                } else {
                                    return label + ': ' + value + ' وحدة';
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value, index, values) {
                                return value;
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// تحديث مخطط المؤشرات المالية
function updateFinancialIndicatorsChart(actualValues, targetValues) {
    if (window.financialIndicatorsChart) {
        // تحديث بيانات المخطط
        window.financialIndicatorsChart.data.datasets[0].data = actualValues;
        window.financialIndicatorsChart.data.datasets[1].data = targetValues;
        
        // تحديث المخطط
        window.financialIndicatorsChart.update();
    }
}

// ===== تهيئة مخطط تحليل SWOT =====
function initSwotChart() {
    const swotCtx = document.getElementById('swot-chart');
    
    if (swotCtx) {
        // تهيئة مخطط تحليل SWOT باستخدام Chart.js
        window.swotChart = new Chart(swotCtx, {
            type: 'polarArea',
            data: {
                labels: ['نقاط القوة', 'نقاط الضعف', 'الفرص', 'التهديدات'],
                datasets: [{
                    data: [4, 2, 5, 3],
                    backgroundColor: [
                        'rgba(46, 184, 92, 0.7)',
                        'rgba(229, 83, 83, 0.7)',
                        'rgba(93, 92, 222, 0.7)',
                        'rgba(255, 159, 64, 0.7)'
                    ],
                    borderColor: [
                        'rgba(46, 184, 92, 1)',
                        'rgba(229, 83, 83, 1)',
                        'rgba(93, 92, 222, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed.r + ' / 5';
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        min: 0,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// تحديث مخطط تحليل SWOT
function updateSwotChart(swotData) {
    if (window.swotChart && swotData) {
        // تحديث بيانات المخطط
        window.swotChart.data.datasets[0].data = swotData;
        
        // تحديث المخطط
        window.swotChart.update();
    }
}

// ===== إضافة مستمعي الأحداث للرسوم البيانية =====
function setupChartEventListeners() {
    // إضافة مستمعي الأحداث لأزرار تحديث الرسوم البيانية
    const updateChartsBtn = document.getElementById('update-charts-btn');
    
    if (updateChartsBtn) {
        updateChartsBtn.addEventListener('click', function() {
            // تحديث جميع الرسوم البيانية
            updateAllCharts();
            
            // عرض إشعار نجاح
            showNotification('تم تحديث الرسوم البيانية بنجاح');
        });
    }
    
    // إضافة مستمعي الأحداث لأزرار تصدير الرسوم البيانية
    const exportChartsBtn = document.getElementById('export-charts-btn');
    
    if (exportChartsBtn) {
        exportChartsBtn.addEventListener('click', function() {
            // تصدير جميع الرسوم البيانية
            exportAllCharts();
            
            // عرض إشعار نجاح
            showNotification('تم تصدير الرسوم البيانية بنجاح');
        });
    }
    
    // إضافة مستمعي الأحداث لأزرار تبديل نوع الرسم البياني
    const chartTypeSelects = document.querySelectorAll('.chart-type-select');
    
    chartTypeSelects.forEach(select => {
        select.addEventListener('change', function() {
            const chartId = this.getAttribute('data-chart-id');
            const chartType = this.value;
            
            // تغيير نوع الرسم البياني
            changeChartType(chartId, chartType);
        });
    });
}

// تحديث جميع الرسوم البيانية
function updateAllCharts() {
    // جمع البيانات من النموذج
    const formData = collectFormData();
    
    // تحديث مخطط الطلب المتوقع
    updateDemandChart();
    
    // تحديث مخطط الإيرادات والتكاليف
    updateRevenueExpenseChart(formData.revenueData, formData.expenseData);
    
    // تحديث مخطط التدفق النقدي
    updateCashFlowChart(formData.cashFlowData);
    
    // تحديث مخطط نقطة التعادل
    updateBreakEvenChart(formData.fixedCosts, formData.unitPrice, formData.unitCost);
    
    // تحديث مخطط تحليل الحساسية
    updateSensitivityChart(formData.sensitivityData);
    
    // تحديث مخطط المنافسين
    updateCompetitorsChart(formData.competitorsData);
    
    // تحديث مخطط المؤشرات المالية
    updateFinancialIndicatorsChart(formData.actualIndicators, formData.targetIndicators);
    
    // تحديث مخطط تحليل SWOT
    updateSwotChart(formData.swotData);
}

// جمع البيانات من النموذج
function collectFormData() {
    // هذه دالة مؤقتة لجمع البيانات من النموذج
    // في التطبيق الحقيقي، ستحتاج إلى جمع البيانات الفعلية من حقول النموذج
    
    return {
        revenueData: [100000, 150000, 200000, 250000, 300000],
        expenseData: [80000, 100000, 120000, 140000, 160000],
        cashFlowData: [20000, 50000, 80000, 110000, 140000],
        fixedCosts: 50000,
        unitPrice: 100,
        unitCost: 50,
        sensitivityData: [
            [80000, 90000, 100000, 110000, 120000],
            [120000, 110000, 100000, 90000, 80000],
            [110000, 105000, 100000, 95000, 90000]
        ],
        competitorsData: [
            [4.5, 4.0, 4.2, 3.8, 4.7, 3.5],
            [4.0, 3.5, 3.8, 4.2, 3.5, 4.0],
            [3.8, 4.2, 3.5, 3.0, 3.2, 3.8]
        ],
        actualIndicators: [25, 22, 3.5, 500],
        targetIndicators: [20, 18, 4, 600],
        swotData: [4, 2, 5, 3]
    };
}

// تصدير جميع الرسوم البيانية
function exportAllCharts() {
    // الحصول على جميع الرسوم البيانية
    const charts = [
        { chart: window.demandChart, name: 'الطلب_المتوقع' },
        { chart: window.revenueExpenseChart, name: 'الإيرادات_والتكاليف' },
        { chart: window.cashFlowChart, name: 'التدفق_النقدي' },
        { chart: window.breakEvenChart, name: 'نقطة_التعادل' },
        { chart: window.sensitivityChart, name: 'تحليل_الحساسية' },
        { chart: window.competitorsChart, name: 'المنافسين' },
        { chart: window.financialIndicatorsChart, name: 'المؤشرات_المالية' },
        { chart: window.swotChart, name: 'تحليل_SWOT' }
    ];
    
    // تصدير كل رسم بياني
    charts.forEach(item => {
        if (item.chart) {
            // تصدير الرسم البياني كصورة PNG
            const url = item.chart.toBase64Image();
            
            // إنشاء رابط مؤقت لتنزيل الصورة
            const a = document.createElement('a');
            a.href = url;
            a.download = item.name + '.png';
            a.click();
        }
    });
}

// تغيير نوع الرسم البياني
function changeChartType(chartId, chartType) {
    // الحصول على الرسم البياني المطلوب
    let chart;
    
    switch (chartId) {
        case 'demand-chart':
            chart = window.demandChart;
            break;
        case 'revenue-expense-chart':
            chart = window.revenueExpenseChart;
            break;
        case 'cash-flow-chart':
            chart = window.cashFlowChart;
            break;
        case 'break-even-chart':
            chart = window.breakEvenChart;
            break;
        case 'sensitivity-chart':
            chart = window.sensitivityChart;
            break;
        case 'competitors-chart':
            chart = window.competitorsChart;
            break;
        case 'financial-indicators-chart':
            chart = window.financialIndicatorsChart;
            break;
        case 'swot-chart':
            chart = window.swotChart;
            break;
    }
    
    if (chart) {
        // تغيير نوع الرسم البياني
        chart.config.type = chartType;
        
        // تحديث الرسم البياني
        chart.update();
    }
}

// ===== تصدير الدوال =====
window.initAdvancedCharts = initAdvancedCharts;
window.updateDemandChart = updateDemandChart;
window.updateRevenueExpenseChart = updateRevenueExpenseChart;
window.updateCashFlowChart = updateCashFlowChart;
window.updateBreakEvenChart = updateBreakEvenChart;
window.updateSensitivityChart = updateSensitivityChart;
window.updateCompetitorsChart = updateCompetitorsChart;
window.updateFinancialIndicatorsChart = updateFinancialIndicatorsChart;
window.updateSwotChart = updateSwotChart;
window.updateAllCharts = updateAllCharts;
window.exportAllCharts = exportAllCharts;
window.changeChartType = changeChartType;
