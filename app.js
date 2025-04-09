// تطبيق دراسة الجدوى الشاملة - ملف JavaScript الرئيسي
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة التطبيق
    initApp();
    
    // إضافة مستمعي الأحداث
    setupEventListeners();
    
    // تهيئة الرسوم البيانية
    initCharts();
    
    // إعداد النماذج الديناميكية
    setupDynamicForms();
    
    // تحميل البيانات المحفوظة (إن وجدت)
    loadFormData();
    
    // تحديث شريط التقدم
    updateProgress();
});

// ===== تهيئة التطبيق =====
function initApp() {
    // تهيئة وضع الظلام/الضوء
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        // تعيين الحالة الأولية
        darkModeToggle.checked = document.documentElement.classList.contains('dark');
        
        // إضافة مستمع الحدث
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            
            // حفظ التفضيل
            localStorage.setItem('darkMode', this.checked);
        });
    }
    
    // تهيئة القائمة الجانبية للأجهزة المحمولة
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    
    if (menuToggle && sidebar && sidebarClose) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('translate-x-0');
            sidebar.classList.toggle('-translate-x-full');
        });
        
        sidebarClose.addEventListener('click', function() {
            sidebar.classList.remove('translate-x-0');
            sidebar.classList.add('-translate-x-full');
        });
    }
    
    // تهيئة عناصر التنقل
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    
    // تحديد القسم النشط عند التمرير
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
}

// ===== إعداد مستمعي الأحداث =====
function setupEventListeners() {
    // زر حفظ البيانات
    const saveDataBtn = document.getElementById('save-data');
    if (saveDataBtn) {
        saveDataBtn.addEventListener('click', function() {
            saveFormData();
            showNotification('تم حفظ البيانات بنجاح');
        });
    }
    
    // أزرار التصدير
    const exportSectionBtn = document.getElementById('export-section');
    const exportOptions = document.getElementById('export-options');
    
    if (exportSectionBtn && exportOptions) {
        exportSectionBtn.addEventListener('click', function() {
            exportOptions.classList.toggle('hidden');
        });
    }
    
    // زر تصدير PDF
    const exportPdfBtn = document.getElementById('export-pdf');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', function() {
            generatePDF();
        });
    }
    
    // زر تصدير Word
    const exportWordBtn = document.getElementById('export-word');
    if (exportWordBtn) {
        exportWordBtn.addEventListener('click', function() {
            generateWord();
        });
    }
    
    // زر تصدير Excel
    const exportExcelBtn = document.getElementById('export-excel');
    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', function() {
            generateExcel();
        });
    }
    
    // زر معاينة التقرير
    const generateReportBtn = document.getElementById('generate-report');
    const reportPreviewModal = document.getElementById('report-preview-modal');
    const closePreviewBtn = document.getElementById('close-preview');
    const closePreviewBtn2 = document.getElementById('close-preview-btn');
    
    if (generateReportBtn && reportPreviewModal) {
        generateReportBtn.addEventListener('click', function() {
            generateReport();
            reportPreviewModal.classList.remove('hidden');
        });
    }
    
    if (closePreviewBtn) {
        closePreviewBtn.addEventListener('click', function() {
            reportPreviewModal.classList.add('hidden');
        });
    }
    
    if (closePreviewBtn2) {
        closePreviewBtn2.addEventListener('click', function() {
            reportPreviewModal.classList.add('hidden');
        });
    }
    
    // زر تصدير PDF من المعاينة
    const exportPdfReportBtn = document.getElementById('export-pdf-report');
    if (exportPdfReportBtn) {
        exportPdfReportBtn.addEventListener('click', function() {
            generatePDF(true);
        });
    }
    
    // زر المساعد الذكي
    const aiAssistantBtn = document.getElementById('ai-assistant-btn');
    const aiAssistantModal = document.getElementById('ai-assistant-modal');
    const closeAiAssistantBtn = document.getElementById('close-ai-assistant');
    
    if (aiAssistantBtn && aiAssistantModal) {
        aiAssistantBtn.addEventListener('click', function() {
            aiAssistantModal.classList.remove('hidden');
        });
    }
    
    if (closeAiAssistantBtn) {
        closeAiAssistantBtn.addEventListener('click', function() {
            aiAssistantModal.classList.add('hidden');
        });
    }
    
    // أزرار التنقل بين الأقسام
    const nextSectionBtns = document.querySelectorAll('.next-section');
    const prevSectionBtns = document.querySelectorAll('.prev-section');
    
    nextSectionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentSection = this.closest('section');
            const nextSection = currentSection.nextElementSibling;
            
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    prevSectionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentSection = this.closest('section');
            const prevSection = currentSection.previousElementSibling;
            
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // إضافة مستمعي الأحداث لعناصر النموذج
    document.querySelectorAll('input, textarea, select').forEach(element => {
        element.addEventListener('input', function() {
            updateProgress();
        });
    });
    
    // إعداد نوافذ إضافة المنتجات
    setupProductModal();
    
    // إعداد نوافذ إضافة المنافسين
    setupCompetitorModal();
    
    // إعداد أزرار تحليل الذكاء الاصطناعي
    setupAIAnalysisButtons();
}

// ===== إعداد نافذة إضافة المنتجات =====
function setupProductModal() {
    const addProductBtn = document.getElementById('add-product-btn');
    const productModal = document.getElementById('product-modal');
    const cancelProductBtn = document.getElementById('cancel-product');
    const saveProductBtn = document.getElementById('save-product');
    const productsContainer = document.getElementById('products-container');
    
    if (addProductBtn && productModal && cancelProductBtn && saveProductBtn && productsContainer) {
        // فتح النافذة
        addProductBtn.addEventListener('click', function() {
            // إعادة تعيين النموذج
            document.getElementById('product_name').value = '';
            document.getElementById('product_description').value = '';
            document.getElementById('product_price').value = '';
            
            // عرض النافذة
            productModal.classList.remove('hidden');
        });
        
        // إغلاق النافذة
        cancelProductBtn.addEventListener('click', function() {
            productModal.classList.add('hidden');
        });
        
        // حفظ المنتج
        saveProductBtn.addEventListener('click', function() {
            const productName = document.getElementById('product_name').value;
            const productDescription = document.getElementById('product_description').value;
            const productPrice = document.getElementById('product_price').value;
            
            if (productName.trim() === '') {
                showNotification('يرجى إدخال اسم المنتج', true);
                return;
            }
            
            // إنشاء عنصر المنتج
            const productItem = document.createElement('div');
            productItem.className = 'product-item bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600';
            productItem.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-medium text-lg">${productName}</h4>
                        <p class="text-gray-600 dark:text-gray-300 mt-1">${productDescription || 'لا يوجد وصف'}</p>
                    </div>
                    <div class="flex items-center">
                        <span class="badge badge-primary ml-2">${productPrice || '0'} $</span>
                        <button type="button" class="remove-product btn btn-danger p-1 ml-2">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <input type="hidden" name="product_name[]" value="${productName}">
                <input type="hidden" name="product_description[]" value="${productDescription}">
                <input type="hidden" name="product_price[]" value="${productPrice}">
            `;
            
            // إضافة المنتج إلى الحاوية
            productsContainer.appendChild(productItem);
            
            // إضافة مستمع حدث لزر الحذف
            productItem.querySelector('.remove-product').addEventListener('click', function() {
                productsContainer.removeChild(productItem);
                updateFinancialData();
            });
            
            // إغلاق النافذة
            productModal.classList.add('hidden');
            
            // تحديث البيانات المالية
            updateFinancialData();
            
            // تحديث شريط التقدم
            updateProgress();
        });
    }
}

// ===== إعداد نافذة إضافة المنافسين =====
function setupCompetitorModal() {
    const addCompetitorBtn = document.getElementById('add-competitor-btn');
    const competitorModal = document.getElementById('competitor-modal');
    const cancelCompetitorBtn = document.getElementById('cancel-competitor');
    const saveCompetitorBtn = document.getElementById('save-competitor');
    const competitorsContainer = document.getElementById('competitors-container');
    
    if (addCompetitorBtn && competitorModal && cancelCompetitorBtn && saveCompetitorBtn && competitorsContainer) {
        // فتح النافذة
        addCompetitorBtn.addEventListener('click', function() {
            // إعادة تعيين النموذج
            document.getElementById('competitor_name').value = '';
            document.getElementById('competitor_strength').value = '';
            
            // عرض النافذة
            competitorModal.classList.remove('hidden');
        });
        
        // إغلاق النافذة
        cancelCompetitorBtn.addEventListener('click', function() {
            competitorModal.classList.add('hidden');
        });
        
        // حفظ المنافس
        saveCompetitorBtn.addEventListener('click', function() {
            const competitorName = document.getElementById('competitor_name').value;
            const competitorStrength = document.getElementById('competitor_strength').value;
            
            if (competitorName.trim() === '') {
                showNotification('يرجى إدخال اسم المنافس', true);
                return;
            }
            
            // إنشاء عنصر المنافس
            const competitorItem = document.createElement('div');
            competitorItem.className = 'competitor-item bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600';
            competitorItem.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-medium">${competitorName}</h4>
                        <p class="text-gray-600 dark:text-gray-300 mt-1">${competitorStrength || 'لا توجد معلومات'}</p>
                    </div>
                    <button type="button" class="remove-competitor btn btn-danger p-1">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <input type="hidden" name="competitor_name[]" value="${competitorName}">
                <input type="hidden" name="competitor_strength[]" value="${competitorStrength}">
            `;
            
            // إضافة المنافس إلى الحاوية
            competitorsContainer.appendChild(competitorItem);
            
            // إضافة مستمع حدث لزر الحذف
            competitorItem.querySelector('.remove-competitor').addEventListener('click', function() {
                competitorsContainer.removeChild(competitorItem);
                updateProgress();
            });
            
            // إغلاق النافذة
            competitorModal.classList.add('hidden');
            
            // تحديث شريط التقدم
            updateProgress();
        });
    }
}

// ===== إعداد النماذج الديناميكية =====
function setupDynamicForms() {
    // إضافة أهداف المشروع
    const addObjectiveBtn = document.querySelector('.add-objective');
    if (addObjectiveBtn) {
        addObjectiveBtn.addEventListener('click', function() {
            const container = document.getElementById('objectives-container');
            const index = container.querySelectorAll('input[name="objectives[]"]').length + 1;
            
            const newItem = document.createElement('div');
            newItem.className = 'flex items-center mb-2';
            newItem.innerHTML = `
                <input type="text" class="form-input" name="objectives[]" placeholder="هدف ${index}">
                <button type="button" class="remove-item btn btn-danger ms-2">
                    <i class="fas fa-minus"></i>
                </button>
            `;
            
            container.appendChild(newItem);
            
            newItem.querySelector('.remove-item').addEventListener('click', function() {
                container.removeChild(newItem);
                updateProgress();
            });
            
            // تحديث شريط التقدم
            updateProgress();
        });
    }
}

// ===== تهيئة الرسوم البيانية =====
function initCharts() {
    // مخطط الطلب المتوقع
    const demandCtx = document.getElementById('demand-chart');
    
    if (demandCtx) {
        window.demandChart = new Chart(demandCtx, {
            type: 'bar',
            data: {
                labels: ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة'],
                datasets: [{
                    label: 'الطلب المتوقع',
                    data: [500, 750, 1000],
                    backgroundColor: [
                        'rgba(93, 92, 222, 0.5)',
                        'rgba(93, 92, 222, 0.7)',
                        'rgba(93, 92, 222, 0.9)'
                    ],
                    borderColor: [
                        'rgba(93, 92, 222, 1)',
                        'rgba(93, 92, 222, 1)',
                        'rgba(93, 92, 222, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
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
                }
            }
        });
        
        // إضافة مستمعي الأحداث لشرائح التمرير
        const demandYear1 = document.getElementById('demand-year1');
        const demandYear2 = document.getElementById('demand-year2');
        const demandYear3 = document.getElementById('demand-year3');
        
        const demandYear1Value = document.getElementById('demand-year1-value');
        const demandYear2Value = document.getElementById('demand-year2-value');
        const demandYear3Value = document.getElementById('demand-year3-value');
        
        if (demandYear1 && demandYear2 && demandYear3) {
            demandYear1.addEventListener('input', function() {
                demandYear1Value.textContent = this.value;
                updateDemandChart();
            });
            
            demandYear2.addEventListener('input', function() {
                demandYear2Value.textContent = this.value;
                updateDemandChart();
            });
            
            demandYear3.addEventListener('input', function() {
                demandYear3Value.textContent = this.value;
                updateDemandChart();
            });
        }
    }
}

// ===== تحديث مخطط الطلب المتوقع =====
function updateDemandChart() {
    const demandYear1 = document.getElementById('demand-year1');
    const demandYear2 = document.getElementById('demand-year2');
    const demandYear3 = document.getElementById('demand-year3');
    
    if (window.demandChart && demandYear1 && demandYear2 && demandYear3) {
        window.demandChart.data.datasets[0].data = [
            parseInt(demandYear1.value),
            parseInt(demandYear2.value),
            parseInt(demandYear3.value)
        ];
        
        window.demandChart.update();
        
        // تحديث البيانات المالية
        updateFinancialData();
    }
}

// ===== الحسابات المالية المتقدمة =====

// حساب نقطة التعادل
function calculateBreakEven(fixedCosts, unitPrice, unitCost) {
    if (unitPrice <= unitCost) {
        return {
            units: Infinity,
            value: Infinity
        };
    }
    
    const breakEvenUnits = fixedCosts / (unitPrice - unitCost);
    const breakEvenValue = breakEvenUnits * unitPrice;
    
    return {
        units: Math.round(breakEvenUnits),
        value: Math.round(breakEvenValue)
    };
}

// حساب معدل العائد الداخلي (IRR)
function calculateIRR(initialInvestment, cashFlows, years = 5) {
    // تنفيذ طريقة نيوتن-رافسون لحساب IRR
    
    // دالة لحساب صافي القيمة الحالية عند معدل خصم معين
    function npv(rate, initialInvestment, cashFlows) {
        let npv = -initialInvestment;
        
        for (let i = 0; i < cashFlows.length; i++) {
            npv += cashFlows[i] / Math.pow(1 + rate, i + 1);
        }
        
        return npv;
    }
    
    // دالة مشتقة NPV بالنسبة لمعدل الخصم
    function npvDerivative(rate, initialInvestment, cashFlows) {
        let derivative = 0;
        
        for (let i = 0; i < cashFlows.length; i++) {
            derivative -= (i + 1) * cashFlows[i] / Math.pow(1 + rate, i + 2);
        }
        
        return derivative;
    }
    
    // تنفيذ طريقة نيوتن-رافسون
    let rate = 0.1; // تخمين أولي
    const maxIterations = 100;
    const tolerance = 0.0001;
    
    for (let i = 0; i < maxIterations; i++) {
        const npvValue = npv(rate, initialInvestment, cashFlows);
        
        if (Math.abs(npvValue) < tolerance) {
            break;
        }
        
        const derivative = npvDerivative(rate, initialInvestment, cashFlows);
        
        if (derivative === 0) {
            return null; // لا يمكن حساب IRR
        }
        
        rate = rate - npvValue / derivative;
        
        if (rate < -1) {
            return null; // لا يمكن حساب IRR
        }
    }
    
    return Math.round(rate * 100);
}

// حساب صافي القيمة الحالية (NPV)
function calculateNPV(initialInvestment, cashFlows, discountRate = 0.1, years = 5) {
    let npv = -initialInvestment;
    
    for (let i = 0; i < cashFlows.length; i++) {
        npv += cashFlows[i] / Math.pow(1 + discountRate, i + 1);
    }
    
    return Math.round(npv);
}

// حساب فترة الاسترداد (Payback Period)
function calculatePaybackPeriod(initialInvestment, cashFlows) {
    let cumulativeCashFlow = -initialInvestment;
    let paybackPeriod = 0;
    
    for (let i = 0; i < cashFlows.length; i++) {
        cumulativeCashFlow += cashFlows[i];
        
        if (cumulativeCashFlow >= 0) {
            // حساب الفترة الدقيقة
            if (i > 0) {
                const previousCumulativeCashFlow = cumulativeCashFlow - cashFlows[i];
                const fraction = Math.abs(previousCumulativeCashFlow) / cashFlows[i];
                paybackPeriod = i + fraction;
            } else {
                paybackPeriod = i + 1;
            }
            
            break;
        }
        
        if (i === cashFlows.length - 1 && cumulativeCashFlow < 0) {
            return Infinity; // لم يتم استرداد الاستثمار خلال الفترة المحددة
        }
    }
    
    return Math.round(paybackPeriod * 10) / 10; // تقريب إلى رقم عشري واحد
}

// حساب معدل العائد على الاستثمار (ROI)
function calculateROI(initialInvestment, totalProfit) {
    if (initialInvestment === 0) {
        return Infinity;
    }
    
    return Math.round((totalProfit / initialInvestment) * 100);
}

// تحليل الحساسية
function performSensitivityAnalysis(baseNPV, parameters, variations = [-20, -10, 0, 10, 20]) {
    const results = {};
    
    for (const param in parameters) {
        results[param] = [];
        
        for (const variation of variations) {
            const paramValue = parameters[param];
            const newValue = paramValue * (1 + variation / 100);
            
            // حساب NPV الجديد مع تغيير المعلمة
            const newParams = { ...parameters };
            newParams[param] = newValue;
            
            // هنا نفترض أن لدينا دالة لحساب NPV باستخدام المعلمات
            // في التطبيق الحقيقي، ستحتاج إلى تنفيذ هذه الدالة بناءً على نموذج الأعمال الخاص بك
            const newNPV = calculateNewNPV(baseNPV, param, variation);
            
            results[param].push({
                variation,
                npv: newNPV,
                change: ((newNPV - baseNPV) / baseNPV) * 100
            });
        }
    }
    
    return results;
}

// دالة مساعدة لحساب NPV الجديد في تحليل الحساسية
function calculateNewNPV(baseNPV, param, variation) {
    // هذه مجرد دالة تقريبية للتوضيح
    // في التطبيق الحقيقي، ستحتاج إلى نموذج أكثر دقة
    
    let sensitivityFactor;
    
    switch (param) {
        case 'revenue':
            sensitivityFactor = 1.5; // الإيرادات لها تأثير كبير على NPV
            break;
        case 'costs':
            sensitivityFactor = -1.2; // التكاليف لها تأثير سلبي على NPV
            break;
        case 'discountRate':
            sensitivityFactor = -0.8; // معدل الخصم له تأثير سلبي على NPV
            break;
        default:
            sensitivityFactor = 1.0;
    }
    
    return Math.round(baseNPV * (1 + (variation / 100) * sensitivityFactor));
}

// ===== تحديث البيانات المالية =====
function updateFinancialData() {
    // تحديث التكاليف الاستثمارية
    updateInvestmentCosts();
    
    // تحديث التكاليف التشغيلية
    updateOperatingCosts();
    
    // تحديث الإيرادات
    updateRevenues();
    
    // تحديث التمويل
    updateFunding();
    
    // تحديث المؤشرات المالية
    updateFinancialIndicators();
}

// تحديث التكاليف الاستثمارية
function updateInvestmentCosts() {
    // سيتم تنفيذ هذه الدالة لاحقاً عند إضافة أقسام التكاليف الاستثمارية
}

// تحديث التكاليف التشغيلية
function updateOperatingCosts() {
    // سيتم تنفيذ هذه الدالة لاحقاً عند إضافة أقسام التكاليف التشغيلية
}

// تحديث الإيرادات
function updateRevenues() {
    // سيتم تنفيذ هذه الدالة لاحقاً عند إضافة أقسام الإيرادات
}

// تحديث التمويل
function updateFunding() {
    // سيتم تنفيذ هذه الدالة لاحقاً عند إضافة أقسام التمويل
}

// تحديث المؤشرات المالية
function updateFinancialIndicators() {
    // سيتم تنفيذ هذه الدالة لاحقاً عند إضافة أقسام المؤشرات المالية
}

// ===== إعداد أزرار تحليل الذكاء الاصطناعي =====
function setupAIAnalysisButtons() {
    const analyzeMarketBtn = document.getElementById('analyze-market-btn');
    const analyzeFinancialBtn = document.getElementById('analyze-financial-btn');
    const generateRecommendationsBtn = document.getElementById('generate-recommendations-btn');
    const aiAnalysisResults = document.getElementById('ai-analysis-results');
    const aiAnalysisContent = document.getElementById('ai-analysis-content');
    
    if (analyzeMarketBtn && analyzeFinancialBtn && generateRecommendationsBtn && aiAnalysisResults && aiAnalysisContent) {
        analyzeMarketBtn.addEventListener('click', function() {
            showLoading('جاري تحليل السوق...');
            
            // محاكاة تحليل السوق باستخدام الذكاء الاصطناعي
            setTimeout(() => {
                const marketData = collectMarketData();
                const marketAnalysis = performMarketAnalysis(marketData);
                
                displayAIAnalysisResults('تحليل السوق', marketAnalysis);
                
                hideLoading();
            }, 1500);
        });
        
        analyzeFinancialBtn.addEventListener('click', function() {
            showLoading('جاري التحليل المالي...');
            
            // محاكاة التحليل المالي باستخدام الذكاء الاصطناعي
            setTimeout(() => {
                const financialData = collectFinancialData();
                const financialAnalysis = performFinancialAnalysis(financialData);
                
                displayAIAnalysisResults('التحليل المالي', financialAnalysis);
                
                hideLoading();
            }, 1500);
        });
        
        generateRecommendationsBtn.addEventListener('click', function() {
            showLoading('جاري توليد التوصيات...');
            
            // محاكاة توليد التوصيات باستخدام الذكاء الاصطناعي
            setTimeout(() => {
                const projectData = collectProjectData();
                const recommendations = generateRecommendations(projectData);
                
                displayAIAnalysisResults('التوصيات', recommendations);
                
                hideLoading();
            }, 1500);
        });
    }
}

// جمع بيانات السوق
function collectMarketData() {
    return {
        marketOverview: document.getElementById('market_overview')?.value || '',
        competitors: Array.from(document.querySelectorAll('#competitors-container .competitor-item')).map(item => ({
            name: item.querySelector('input[name="competitor_name[]"]').value,
            strength: item.querySelector('input[name="competitor_strength[]"]').value
        })),
        demand: [
            parseInt(document.getElementById('demand-year1')?.value || 0),
            parseInt(document.getElementById('demand-year2')?.value || 0),
            parseInt(document.getElementById('demand-year3')?.value || 0)
        ],
        swot: {
            strengths: document.getElementById('swot_strengths')?.value || '',
            weaknesses: document.getElementById('swot_weaknesses')?.value || '',
            opportunities: document.getElementById('swot_opportunities')?.value || '',
            threats: document.getElementById('swot_threats')?.value || ''
        },
        marketingStrategy: document.getElementById('marketing_strategy')?.value || '',
        pricingPolicy: document.getElementById('pricing_policy')?.value || ''
    };
}

// تحليل السوق
function performMarketAnalysis(marketData) {
    // هذه مجرد محاكاة لتحليل السوق
    // في التطبيق الحقيقي، يمكن استخدام خوارزميات أكثر تعقيدًا
    
    let analysis = '';
    
    // تحليل نمو الطلب
    const demandGrowthYear2 = marketData.demand[1] > 0 ? ((marketData.demand[1] - marketData.demand[0]) / marketData.demand[0]) * 100 : 0;
    const demandGrowthYear3 = marketData.demand[2] > 0 ? ((marketData.demand[2] - marketData.demand[1]) / marketData.demand[1]) * 100 : 0;
    const avgDemandGrowth = (demandGrowthYear2 + demandGrowthYear3) / 2;
    
    analysis += `<div class="mb-4">
        <h4 class="font-semibold text-lg mb-2">تحليل نمو الطلب</h4>
        <p>معدل النمو السنوي المتوسط للطلب: <span class="font-semibold">${avgDemandGrowth.toFixed(1)}%</span></p>
        <div class="mt-2">
            <div class="flex justify-between mb-1">
                <span>النمو في السنة الثانية:</span>
                <span class="${demandGrowthYear2 >= 20 ? 'text-green-500' : demandGrowthYear2 >= 10 ? 'text-amber-500' : 'text-red-500'}">${demandGrowthYear2.toFixed(1)}%</span>
            </div>
            <div class="flex justify-between">
                <span>النمو في السنة الثالثة:</span>
                <span class="${demandGrowthYear3 >= 20 ? 'text-green-500' : demandGrowthYear3 >= 10 ? 'text-amber-500' : 'text-red-500'}">${demandGrowthYear3.toFixed(1)}%</span>
            </div>
        </div>
    </div>`;
    
    // تحليل المنافسين
    analysis += `<div class="mb-4">
        <h4 class="font-semibold text-lg mb-2">تحليل المنافسين</h4>
        <p>عدد المنافسين الرئيسيين: <span class="font-semibold">${marketData.competitors.length}</span></p>`;
    
    if (marketData.competitors.length > 0) {
        analysis += `<div class="mt-2">
            <p class="mb-1">أبرز المنافسين:</p>
            <ul class="list-disc pr-5">`;
        
        marketData.competitors.forEach(competitor => {
            analysis += `<li><span class="font-medium">${competitor.name}</span>: ${competitor.strength}</li>`;
        });
        
        analysis += `</ul></div>`;
    }
    
    analysis += `</div>`;
    
    // تحليل SWOT
    analysis += `<div class="mb-4">
        <h4 class="font-semibold text-lg mb-2">تحليل SWOT</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-900">
                <h5 class="font-medium mb-1 text-green-700 dark:text-green-400">نقاط القوة</h5>
                <p>${marketData.swot.strengths || 'لم يتم تحديد نقاط القوة'}</p>
            </div>
            <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-900">
                <h5 class="font-medium mb-1 text-red-700 dark:text-red-400">نقاط الضعف</h5>
                <p>${marketData.swot.weaknesses || 'لم يتم تحديد نقاط الضعف'}</p>
            </div>
            <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-900">
                <h5 class="font-medium mb-1 text-blue-700 dark:text-blue-400">الفرص</h5>
                <p>${marketData.swot.opportunities || 'لم يتم تحديد الفرص'}</p>
            </div>
            <div class="p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-900">
                <h5 class="font-medium mb-1 text-amber-700 dark:text-amber-400">التهديدات</h5>
                <p>${marketData.swot.threats || 'لم يتم تحديد التهديدات'}</p>
            </div>
        </div>
    </div>`;
    
    // توصيات السوق
    analysis += `<div>
        <h4 class="font-semibold text-lg mb-2">توصيات السوق</h4>
        <ul class="list-disc pr-5">`;
    
    if (avgDemandGrowth >= 20) {
        analysis += `<li>معدل نمو الطلب مرتفع، مما يشير إلى فرصة سوقية جيدة.</li>`;
    } else if (avgDemandGrowth >= 10) {
        analysis += `<li>معدل نمو الطلب معتدل، يمكن تحسينه من خلال استراتيجيات تسويقية فعالة.</li>`;
    } else {
        analysis += `<li>معدل نمو الطلب منخفض، يجب إعادة تقييم استراتيجية التسويق والمنتجات.</li>`;
    }
    
    if (marketData.competitors.length > 3) {
        analysis += `<li>المنافسة في السوق قوية، يجب التركيز على المزايا التنافسية الفريدة.</li>`;
    } else if (marketData.competitors.length > 0) {
        analysis += `<li>المنافسة في السوق معتدلة، هناك فرصة للتميز وكسب حصة سوقية.</li>`;
    } else {
        analysis += `<li>المنافسة في السوق منخفضة، هناك فرصة كبيرة للريادة في السوق.</li>`;
    }
    
    analysis += `</ul></div>`;
    
    return analysis;
}

// جمع البيانات المالية
function collectFinancialData() {
    // سيتم تنفيذ هذه الدالة لاحقاً عند إضافة أقسام البيانات المالية
    return {};
}

// التحليل المالي
function performFinancialAnalysis(financialData) {
    // سيتم تنفيذ هذه الدالة لاحقاً عند إضافة أقسام البيانات المالية
    return '';
}

// جمع بيانات المشروع
function collectProjectData() {
    return {
        projectName: document.getElementById('project_name')?.value || '',
        location: document.getElementById('location')?.value || '',
        summary: document.getElementById('summary')?.value || '',
        totalCost: parseFloat(document.getElementById('total_cost')?.value || 0),
        paybackPeriod: parseFloat(document.getElementById('payback_period')?.value || 0),
        targetAudience: document.getElementById('target_audience')?.value || '',
        competitiveAdvantages: document.getElementById('competitive_advantages')?.value || '',
        detailedDescription: document.getElementById('detailed_description')?.value || '',
        objectives: Array.from(document.querySelectorAll('input[name="objectives[]"]')).map(input => input.value),
        vision: document.getElementById('vision')?.value || '',
        products: Array.from(document.querySelectorAll('#products-container .product-item')).map(item => ({
            name: item.querySelector('input[name="product_name[]"]').value,
            description: item.querySelector('input[name="product_description[]"]').value,
            price: parseFloat(item.querySelector('input[name="product_price[]"]').value || 0)
        })),
        innovation: document.getElementById('innovation')?.value || '',
        marketNeeds: document.getElementById('market_needs')?.value || ''
    };
}

// توليد التوصيات
function generateRecommendations(projectData) {
    // هذه مجرد محاكاة لتوليد التوصيات
    // في التطبيق الحقيقي، يمكن استخدام خوارزميات أكثر تعقيدًا
    
    let recommendations = '';
    
    // تحليل اكتمال البيانات
    const completionScore = calculateCompletionScore(projectData);
    
    recommendations += `<div class="mb-4">
        <h4 class="font-semibold text-lg mb-2">اكتمال البيانات</h4>
        <div class="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div class="h-full ${completionScore >= 80 ? 'bg-green-500' : completionScore >= 50 ? 'bg-amber-500' : 'bg-red-500'} rounded-full" style="width: ${completionScore}%"></div>
        </div>
        <p class="mt-2">نسبة اكتمال البيانات: <span class="font-semibold">${completionScore}%</span></p>
        <p class="mt-1 text-sm ${completionScore >= 80 ? 'text-green-500' : completionScore >= 50 ? 'text-amber-500' : 'text-red-500'}">
            ${completionScore >= 80 ? 'ممتاز! البيانات مكتملة بشكل جيد.' : completionScore >= 50 ? 'جيد، ولكن يمكن تحسين اكتمال البيانات.' : 'يجب إكمال المزيد من البيانات للحصول على تحليل دقيق.'}
        </p>
    </div>`;
    
    // توصيات عامة
    recommendations += `<div class="mb-4">
        <h4 class="font-semibold text-lg mb-2">توصيات عامة</h4>
        <ul class="list-disc pr-5">`;
    
    if (!projectData.projectName) {
        recommendations += `<li>يجب تحديد اسم المشروع.</li>`;
    }
    
    if (!projectData.summary) {
        recommendations += `<li>يجب إضافة ملخص للمشروع لتوضيح الفكرة الأساسية.</li>`;
    }
    
    if (projectData.products.length === 0) {
        recommendations += `<li>يجب إضافة المنتجات/المعدات الزراعية التي سيقدمها المشروع.</li>`;
    }
    
    if (!projectData.innovation) {
        recommendations += `<li>يجب توضيح الميزة الابتكارية للمشروع لتمييزه عن المنافسين.</li>`;
    }
    
    if (!projectData.marketNeeds) {
        recommendations += `<li>يجب تحديد احتياجات السوق التي يلبيها المشروع.</li>`;
    }
    
    if (projectData.objectives.length === 0) {
        recommendations += `<li>يجب تحديد أهداف المشروع.</li>`;
    }
    
    if (projectData.totalCost <= 0) {
        recommendations += `<li>يجب تحديد التكلفة التقديرية الإجمالية للمشروع.</li>`;
    }
    
    if (projectData.paybackPeriod <= 0) {
        recommendations += `<li>يجب تحديد المدة المتوقعة لاسترداد رأس المال.</li>`;
    }
    
    recommendations += `</ul></div>`;
    
    // توصيات لتحسين المشروع
    recommendations += `<div>
        <h4 class="font-semibold text-lg mb-2">توصيات لتحسين المشروع</h4>
        <ul class="list-disc pr-5">`;
    
    if (projectData.products.length > 0) {
        const avgPrice = projectData.products.reduce((sum, product) => sum + product.price, 0) / projectData.products.length;
        
        if (avgPrice <= 0) {
            recommendations += `<li>يجب تحديد أسعار المنتجات/المعدات الزراعية.</li>`;
        } else if (avgPrice < 100) {
            recommendations += `<li>متوسط أسعار المنتجات منخفض نسبياً، يمكن إعادة النظر في استراتيجية التسعير.</li>`;
        }
    }
    
    if (projectData.paybackPeriod > 5) {
        recommendations += `<li>المدة المتوقعة لاسترداد رأس المال طويلة نسبياً، يمكن البحث عن طرق لتقليلها.</li>`;
    }
    
    if (projectData.objectives.length < 3) {
        recommendations += `<li>يمكن إضافة المزيد من الأهداف لتوضيح رؤية المشروع بشكل أفضل.</li>`;
    }
    
    if (!projectData.competitiveAdvantages) {
        recommendations += `<li>يجب تحديد المزايا التنافسية الرئيسية للمشروع.</li>`;
    }
    
    recommendations += `
        <li>قم بإجراء دراسة سوقية تفصيلية لفهم احتياجات العملاء بشكل أفضل.</li>
        <li>ضع خطة تسويقية واضحة لاستهداف الفئة المستهدفة.</li>
        <li>حدد مصادر التمويل المناسبة للمشروع.</li>
        <li>ضع خطة لإدارة المخاطر المحتملة.</li>
    </ul></div>`;
    
    return recommendations;
}

// حساب نسبة اكتمال البيانات
function calculateCompletionScore(projectData) {
    let totalFields = 0;
    let filledFields = 0;
    
    // التحقق من الحقول الأساسية
    const basicFields = [
        'projectName', 'location', 'summary', 'totalCost', 'paybackPeriod',
        'targetAudience', 'competitiveAdvantages', 'detailedDescription',
        'vision', 'innovation', 'marketNeeds'
    ];
    
    totalFields += basicFields.length;
    
    for (const field of basicFields) {
        if (projectData[field]) {
            filledFields++;
        }
    }
    
    // التحقق من الأهداف
    totalFields++;
    if (projectData.objectives.length > 0) {
        filledFields++;
    }
    
    // التحقق من المنتجات
    totalFields++;
    if (projectData.products.length > 0) {
        filledFields++;
    }
    
    return Math.round((filledFields / totalFields) * 100);
}

// ===== عرض نتائج تحليل الذكاء الاصطناعي =====
function displayAIAnalysisResults(title, content) {
    const aiAnalysisResults = document.getElementById('ai-analysis-results');
    const aiAnalysisContent = document.getElementById('ai-analysis-content');
    
    if (aiAnalysisResults && aiAnalysisContent) {
        aiAnalysisResults.classList.remove('hidden');
        
        aiAnalysisContent.innerHTML = `
            <h3 class="text-xl font-semibold mb-4">${title}</h3>
            ${content}
        `;
        
        // التمرير إلى النتائج
        aiAnalysisResults.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== حفظ وتحميل البيانات =====
function saveFormData() {
    const formData = {};
    const formElements = document.querySelectorAll('input, textarea, select');
    
    formElements.forEach(element => {
        if (element.name) {
            if (element.type === 'checkbox') {
                formData[element.name] = element.checked;
            } else if (element.name.includes('[]')) {
                // التعامل مع المدخلات المصفوفية
                const name = element.name.replace('[]', '');
                if (!formData[name]) {
                    formData[name] = [];
                }
                formData[name].push(element.value);
            } else {
                formData[element.name] = element.value;
            }
        }
    });
    
    // حفظ بيانات المنتجات
    formData.products = Array.from(document.querySelectorAll('#products-container .product-item')).map(item => ({
        name: item.querySelector('input[name="product_name[]"]').value,
        description: item.querySelector('input[name="product_description[]"]').value,
        price: item.querySelector('input[name="product_price[]"]').value
    }));
    
    // حفظ بيانات المنافسين
    formData.competitors = Array.from(document.querySelectorAll('#competitors-container .competitor-item')).map(item => ({
        name: item.querySelector('input[name="competitor_name[]"]').value,
        strength: item.querySelector('input[name="competitor_strength[]"]').value
    }));
    
    // حفظ بيانات الرسوم البيانية
    if (window.demandChart) {
        formData.chartData = {
            demand: window.demandChart.data.datasets[0].data
        };
    }
    
    localStorage.setItem('feasibilityStudyData', JSON.stringify(formData));
}

// تحميل البيانات المحفوظة
function loadFormData() {
    const savedData = localStorage.getItem('feasibilityStudyData');
    
    if (savedData) {
        const formData = JSON.parse(savedData);
        const formElements = document.querySelectorAll('input, textarea, select');
        
        formElements.forEach(element => {
            if (element.name && !element.name.includes('[]')) {
                if (element.type === 'checkbox') {
                    element.checked = formData[element.name];
                } else {
                    element.value = formData[element.name] || '';
                }
            }
        });
        
        // تحميل بيانات المنتجات
        if (formData.products && formData.products.length > 0) {
            const productsContainer = document.getElementById('products-container');
            
            if (productsContainer) {
                productsContainer.innerHTML = '';
                
                formData.products.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.className = 'product-item bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600';
                    productItem.innerHTML = `
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="font-medium text-lg">${product.name}</h4>
                                <p class="text-gray-600 dark:text-gray-300 mt-1">${product.description || 'لا يوجد وصف'}</p>
                            </div>
                            <div class="flex items-center">
                                <span class="badge badge-primary ml-2">${product.price || '0'} $</span>
                                <button type="button" class="remove-product btn btn-danger p-1 ml-2">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <input type="hidden" name="product_name[]" value="${product.name}">
                        <input type="hidden" name="product_description[]" value="${product.description}">
                        <input type="hidden" name="product_price[]" value="${product.price}">
                    `;
                    
                    productsContainer.appendChild(productItem);
                    
                    // إضافة مستمع حدث لزر الحذف
                    productItem.querySelector('.remove-product').addEventListener('click', function() {
                        productsContainer.removeChild(productItem);
                        updateFinancialData();
                    });
                });
            }
        }
        
        // تحميل بيانات المنافسين
        if (formData.competitors && formData.competitors.length > 0) {
            const competitorsContainer = document.getElementById('competitors-container');
            
            if (competitorsContainer) {
                competitorsContainer.innerHTML = '';
                
                formData.competitors.forEach(competitor => {
                    const competitorItem = document.createElement('div');
                    competitorItem.className = 'competitor-item bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600';
                    competitorItem.innerHTML = `
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="font-medium">${competitor.name}</h4>
                                <p class="text-gray-600 dark:text-gray-300 mt-1">${competitor.strength || 'لا توجد معلومات'}</p>
                            </div>
                            <button type="button" class="remove-competitor btn btn-danger p-1">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <input type="hidden" name="competitor_name[]" value="${competitor.name}">
                        <input type="hidden" name="competitor_strength[]" value="${competitor.strength}">
                    `;
                    
                    competitorsContainer.appendChild(competitorItem);
                    
                    // إضافة مستمع حدث لزر الحذف
                    competitorItem.querySelector('.remove-competitor').addEventListener('click', function() {
                        competitorsContainer.removeChild(competitorItem);
                        updateProgress();
                    });
                });
            }
        }
        
        // تحميل بيانات الرسوم البيانية
        if (formData.chartData && formData.chartData.demand && window.demandChart) {
            window.demandChart.data.datasets[0].data = formData.chartData.demand;
            window.demandChart.update();
            
            // تحديث شرائح التمرير
            document.getElementById('demand-year1').value = formData.chartData.demand[0];
            document.getElementById('demand-year2').value = formData.chartData.demand[1];
            document.getElementById('demand-year3').value = formData.chartData.demand[2];
            
            document.getElementById('demand-year1-value').textContent = formData.chartData.demand[0];
            document.getElementById('demand-year2-value').textContent = formData.chartData.demand[1];
            document.getElementById('demand-year3-value').textContent = formData.chartData.demand[2];
        }
        
        // تحديث البيانات المالية
        updateFinancialData();
        
        // تحديث شريط التقدم
        updateProgress();
    }
}

// ===== تحديث شريط التقدم =====
function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progressBarSidebar = document.getElementById('progress-bar-sidebar');
    const progressText = document.getElementById('progress-text');
    const progressPercentage = document.getElementById('progress-percentage');
    
    if (!progressBar || !progressBarSidebar) return;
    
    const formElements = document.querySelectorAll('input, textarea, select');
    let filledCount = 0;
    let totalCount = 0;
    
    formElements.forEach(element => {
        if (element.name && !element.name.includes('[]') && !element.classList.contains('remove-item')) {
            totalCount++;
            if (element.value) {
                filledCount++;
            }
        }
    });
    
    const progress = Math.round((filledCount / totalCount) * 100);
    progressBar.style.width = `${progress}%`;
    progressBarSidebar.style.width = `${progress}%`;
    
    if (progressText) {
        progressText.textContent = `${progress}%`;
    }
    
    if (progressPercentage) {
        progressPercentage.textContent = `${progress}%`;
    }
    
    // تغيير اللون بناءً على التقدم
    if (progress < 30) {
        progressBar.classList.remove('bg-primary-600', 'bg-green-500');
        progressBar.classList.add('bg-red-500');
        
        progressBarSidebar.classList.remove('bg-white', 'bg-green-500');
        progressBarSidebar.classList.add('bg-red-500');
    } else if (progress < 70) {
        progressBar.classList.remove('bg-red-500', 'bg-green-500');
        progressBar.classList.add('bg-primary-600');
        
        progressBarSidebar.classList.remove('bg-red-500', 'bg-green-500');
        progressBarSidebar.classList.add('bg-white');
    } else {
        progressBar.classList.remove('bg-red-500', 'bg-primary-600');
        progressBar.classList.add('bg-green-500');
        
        progressBarSidebar.classList.remove('bg-red-500', 'bg-white');
        progressBarSidebar.classList.add('bg-green-500');
    }
}

// ===== توليد التقرير =====
function generateReport() {
    const reportPreviewContent = document.getElementById('report-preview-content');
    
    if (!reportPreviewContent) return;
    
    // جمع البيانات من النموذج
    const projectName = document.getElementById('project_name')?.value || 'مشروع جديد';
    const location = document.getElementById('location')?.value || '-';
    const summary = document.getElementById('summary')?.value || '-';
    const totalCost = document.getElementById('total_cost')?.value || '0';
    const paybackPeriod = document.getElementById('payback_period')?.value || '0';
    const targetAudience = document.getElementById('target_audience')?.value || '-';
    const competitiveAdvantages = document.getElementById('competitive_advantages')?.value || '-';
    
    // إنشاء محتوى التقرير
    let reportContent = `
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg">
            <div class="text-center mb-6">
                <h1 class="text-3xl font-bold text-primary-600 dark:text-primary-400">دراسة جدوى</h1>
                <h2 class="text-xl mt-2">${projectName}</h2>
            </div>
            
            <!-- الملخص التنفيذي -->
            <div class="mb-8 print-section">
                <h2 class="text-2xl font-bold mb-4 text-primary-600 dark:text-white border-r-4 border-primary-600 pr-3">الملخص التنفيذي</h2>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p class="mb-4">${summary}</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div class="flex justify-between border-b pb-2 mb-2 dark:border-gray-600">
                                <span class="font-semibold">اسم المشروع:</span>
                                <span>${projectName}</span>
                            </div>
                            <div class="flex justify-between border-b pb-2 mb-2 dark:border-gray-600">
                                <span class="font-semibold">المكان المقترح:</span>
                                <span>${location}</span>
                            </div>
                            <div class="flex justify-between border-b pb-2 mb-2 dark:border-gray-600">
                                <span class="font-semibold">التكلفة التقديرية:</span>
                                <span>${totalCost} $</span>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between border-b pb-2 mb-2 dark:border-gray-600">
                                <span class="font-semibold">فترة استرداد رأس المال:</span>
                                <span>${paybackPeriod} سنوات</span>
                            </div>
                            <div class="flex justify-between border-b pb-2 mb-2 dark:border-gray-600">
                                <span class="font-semibold">الفئة المستهدفة:</span>
                                <span>${targetAudience}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4">
                        <p class="font-semibold">المزايا التنافسية الرئيسية:</p>
                        <p>${competitiveAdvantages}</p>
                    </div>
                </div>
            </div>
    `;
    
    // وصف المشروع
    const detailedDescription = document.getElementById('detailed_description')?.value || '-';
    const objectives = Array.from(document.querySelectorAll('input[name="objectives[]"]')).map(input => input.value);
    const vision = document.getElementById('vision')?.value || '-';
    const innovation = document.getElementById('innovation')?.value || '-';
    const marketNeeds = document.getElementById('market_needs')?.value || '-';
    
    reportContent += `
        <!-- وصف المشروع -->
        <div class="mb-8 print-section">
            <h2 class="text-2xl font-bold mb-4 text-primary-600 dark:text-white border-r-4 border-primary-600 pr-3">وصف المشروع</h2>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p class="mb-4">${detailedDescription}</p>
                
                <h3 class="text-lg font-semibold mb-2">أهداف المشروع:</h3>
                <ul class="list-disc pr-5 mb-4">
                    ${objectives.map(objective => `<li>${objective || '-'}</li>`).join('')}
                </ul>
                
                <h3 class="text-lg font-semibold mb-2">المنتجات/المعدات الزراعية:</h3>
                <div class="overflow-x-auto">
                    <table class="w-full mb-4">
                        <thead>
                            <tr class="bg-gray-200 dark:bg-gray-600">
                                <th class="p-2 text-right">اسم المنتج</th>
                                <th class="p-2 text-right">الوصف</th>
                                <th class="p-2 text-right">السعر التقديري</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Array.from(document.querySelectorAll('#products-container .product-item')).map(item => `
                                <tr class="border-b dark:border-gray-600">
                                    <td class="p-2">${item.querySelector('input[name="product_name[]"]').value}</td>
                                    <td class="p-2">${item.querySelector('input[name="product_description[]"]').value || '-'}</td>
                                    <td class="p-2">${item.querySelector('input[name="product_price[]"]').value || '0'} $</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h3 class="text-lg font-semibold mb-2">الميزة الابتكارية للمشروع:</h3>
                        <p>${innovation}</p>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-2">احتياجات السوق التي يلبيها المشروع:</h3>
                        <p>${marketNeeds}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // تحليل السوق
    const marketOverview = document.getElementById('market_overview')?.value || '-';
    const swotStrengths = document.getElementById('swot_strengths')?.value || '-';
    const swotWeaknesses = document.getElementById('swot_weaknesses')?.value || '-';
    const swotOpportunities = document.getElementById('swot_opportunities')?.value || '-';
    const swotThreats = document.getElementById('swot_threats')?.value || '-';
    
    reportContent += `
        <!-- تحليل السوق -->
        <div class="mb-8 print-section">
            <h2 class="text-2xl font-bold mb-4 text-primary-600 dark:text-white border-r-4 border-primary-600 pr-3">تحليل السوق</h2>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p class="mb-4">${marketOverview}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h3 class="text-lg font-semibold mb-2">المنافسين الرئيسيين:</h3>
                        <div class="overflow-x-auto">
                            <table class="w-full mb-4">
                                <thead>
                                    <tr class="bg-gray-200 dark:bg-gray-600">
                                        <th class="p-2 text-right">اسم المنافس</th>
                                        <th class="p-2 text-right">نقاط القوة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${Array.from(document.querySelectorAll('#competitors-container .competitor-item')).map(item => `
                                        <tr class="border-b dark:border-gray-600">
                                            <td class="p-2">${item.querySelector('input[name="competitor_name[]"]').value}</td>
                                            <td class="p-2">${item.querySelector('input[name="competitor_strength[]"]').value || '-'}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-2">الطلب المتوقع:</h3>
                        <div class="p-2 bg-white dark:bg-gray-800 rounded border dark:border-gray-600">
                            <table class="w-full mb-2">
                                <tr>
                                    <td class="p-1">السنة الأولى:</td>
                                    <td class="p-1 text-left">${document.getElementById('demand-year1-value').textContent} وحدة</td>
                                </tr>
                                <tr>
                                    <td class="p-1">السنة الثانية:</td>
                                    <td class="p-1 text-left">${document.getElementById('demand-year2-value').textContent} وحدة</td>
                                </tr>
                                <tr>
                                    <td class="p-1">السنة الثالثة:</td>
                                    <td class="p-1 text-left">${document.getElementById('demand-year3-value').textContent} وحدة</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                
                <h3 class="text-lg font-semibold mb-2 mt-4">تحليل SWOT:</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-3 bg-white dark:bg-gray-800 rounded border dark:border-gray-600">
                        <h4 class="font-semibold mb-1">نقاط القوة (Strengths):</h4>
                        <p>${swotStrengths}</p>
                    </div>
                    <div class="p-3 bg-white dark:bg-gray-800 rounded border dark:border-gray-600">
                        <h4 class="font-semibold mb-1">نقاط الضعف (Weaknesses):</h4>
                        <p>${swotWeaknesses}</p>
                    </div>
                    <div class="p-3 bg-white dark:bg-gray-800 rounded border dark:border-gray-600">
                        <h4 class="font-semibold mb-1">الفرص (Opportunities):</h4>
                        <p>${swotOpportunities}</p>
                    </div>
                    <div class="p-3 bg-white dark:bg-gray-800 rounded border dark:border-gray-600">
                        <h4 class="font-semibold mb-1">التهديدات (Threats):</h4>
                        <p>${swotThreats}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إضافة المزيد من الأقسام حسب الحاجة
    
    // إضافة الخلاصة
    reportContent += `
        <!-- الخلاصة -->
        <div class="print-section">
            <h2 class="text-2xl font-bold mb-4 text-primary-600 dark:text-white border-r-4 border-primary-600 pr-3">الخلاصة والتوصيات</h2>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p class="mb-4">
                    بناءً على الدراسة التفصيلية للمشروع، يمكن استنتاج أن مشروع ${projectName} يمتلك مقومات النجاح في سوق المعدات الزراعية.
                    المشروع يستهدف فئة ${targetAudience} ويتميز بـ ${competitiveAdvantages}.
                </p>
                
                <h3 class="text-lg font-semibold mb-2">التوصيات الرئيسية:</h3>
                <ul class="list-disc pr-5">
                    <li>متابعة تنفيذ المشروع وفق الخطة الزمنية المحددة.</li>
                    <li>الاهتمام بجودة المنتجات لتحقيق ميزة تنافسية في السوق.</li>
                    <li>تطوير استراتيجية تسويقية فعالة للوصول إلى الفئة المستهدفة.</li>
                    <li>مراقبة التكاليف بشكل مستمر لضمان تحقيق الأرباح المتوقعة.</li>
                    <li>الاستفادة من الفرص المتاحة في السوق وتجنب التهديدات المحتملة.</li>
                </ul>
            </div>
        </div>
    `;
    
    // إضافة التذييل
    reportContent += `
        <div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>تم إعداد هذه الدراسة باستخدام تطبيق دراسة الجدوى الشاملة المطور</p>
            <p>تاريخ الإصدار: ${new Date().toLocaleDateString('ar-SA')}</p>
        </div>
    `;
    
    // عرض التقرير
    reportPreviewContent.innerHTML = reportContent;
}

// ===== توليد PDF =====
function generatePDF(fromPreview = false) {
    showLoading('جاري توليد ملف PDF...');
    
    setTimeout(() => {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4', true);
            
            // إضافة دعم للغة العربية
            doc.addFont('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap', 'Cairo', 'normal');
            doc.setFont('Cairo');
            
            // الحصول على المحتوى المراد تحويله
            let content;
            if (fromPreview) {
                content = document.getElementById('report-preview-content');
            } else {
                generateReport();
                content = document.getElementById('report-preview-content');
            }
            
            // إضافة العنوان
            doc.setFontSize(22);
            doc.text('دراسة جدوى ورشة تصنيع المعدات الزراعية المبتكرة', 105, 20, null, null, 'center');
            
            const projectName = document.querySelector('input[name="project_name"]').value || 'مشروع جديد';
            
            // تقسيم المحتوى إلى صفحات
            const sections = content.querySelectorAll('.print-section');
            let currentPage = 1;
            
            // استخدام html2canvas لتحويل كل قسم إلى صورة
            const convertSectionsToImages = async () => {
                for (let i = 0; i < sections.length; i++) {
                    const section = sections[i];
                    
                    // إضافة صفحة جديدة بعد الصفحة الأولى
                    if (i > 0) {
                        doc.addPage();
                        currentPage++;
                    }
                    
                    // تحويل القسم إلى صورة
                    const canvas = await html2canvas(section, {
                        scale: 2,
                        useCORS: true,
                        logging: false
                    });
                    
                    const imgData = canvas.toDataURL('image/png');
                    
                    // حساب التحجيم المطلوب ليناسب عرض PDF
                    const imgProps = doc.getImageProperties(imgData);
                    const pdfWidth = doc.internal.pageSize.getWidth() - 20;
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    
                    // إضافة صورة المحتوى
                    doc.addImage(imgData, 'PNG', 10, 30, pdfWidth, pdfHeight);
                    
                    // إضافة أرقام الصفحات
                    doc.setFontSize(10);
                    doc.text(`الصفحة ${currentPage} من ${sections.length}`, 105, doc.internal.pageSize.getHeight() - 10, null, null, 'center');
                }
                
                // حفظ PDF
                doc.save(`دراسة_جدوى_${projectName.replace(/\s+/g, '_')}.pdf`);
                hideLoading();
                showNotification('تم توليد ملف PDF بنجاح');
            };
            
            convertSectionsToImages().catch(error => {
                console.error('Error generating PDF:', error);
                hideLoading();
                showNotification('حدث خطأ أثناء إنشاء ملف PDF', true);
            });
        } catch (error) {
            console.error('Error generating PDF:', error);
            hideLoading();
            showNotification('حدث خطأ أثناء إنشاء ملف PDF', true);
        }
    }, 500);
}

// ===== توليد Word =====
function generateWord() {
    showLoading('جاري توليد ملف Word...');
    
    setTimeout(() => {
        try {
            const projectName = document.querySelector('input[name="project_name"]').value || 'مشروع جديد';
            
            // إنشاء مستند Word
            const doc = new docx.Document({
                sections: [{
                    properties: {},
                    children: [
                        new docx.Paragraph({
                            text: 'دراسة جدوى ورشة تصنيع المعدات الزراعية المبتكرة',
                            heading: docx.HeadingLevel.HEADING_1,
                            alignment: docx.AlignmentType.CENTER
                        }),
                        
                        // الملخص التنفيذي
                        new docx.Paragraph({
                            text: 'الملخص التنفيذي',
                            heading: docx.HeadingLevel.HEADING_2,
                            spacing: { before: 400, after: 200 }
                        }),
                        new docx.Paragraph({
                            text: document.querySelector('input[name="project_name"]').value || '',
                            bullet: { level: 0 }
                        }),
                        new docx.Paragraph({
                            text: document.querySelector('textarea[name="summary"]').value || '',
                            spacing: { before: 200, after: 200 }
                        }),
                        
                        // وصف المشروع
                        new docx.Paragraph({
                            text: 'وصف المشروع',
                            heading: docx.HeadingLevel.HEADING_2,
                            spacing: { before: 400, after: 200 }
                        }),
                        new docx.Paragraph({
                            text: document.querySelector('textarea[name="detailed_description"]').value || '',
                            spacing: { before: 200, after: 200 }
                        }),
                        
                        // إضافة المزيد من الأقسام حسب الحاجة
                    ]
                }]
            });
            
            // توليد blob
            docx.Packer.toBlob(doc).then(blob => {
                const url = URL.createObjectURL(blob);
                
                // إنشاء رابط مؤقت لتنزيل الملف
                const a = document.createElement('a');
                document.body.appendChild(a);
                a.style.display = 'none';
                a.href = url;
                a.download = `دراسة_جدوى_${projectName.replace(/\s+/g, '_')}.docx`;
                a.click();
                
                // تنظيف
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                
                hideLoading();
                showNotification('تم توليد ملف Word بنجاح');
            });
        } catch (error) {
            console.error('Error generating Word document:', error);
            hideLoading();
            showNotification('حدث خطأ أثناء إنشاء ملف Word', true);
        }
    }, 500);
}

// ===== توليد Excel =====
function generateExcel() {
    showLoading('جاري توليد ملف Excel...');
    
    setTimeout(() => {
        try {
            const projectName = document.querySelector('input[name="project_name"]').value || 'مشروع جديد';
            
            // إنشاء مصنف عمل وأوراق
            const wb = XLSX.utils.book_new();
            
            // ورقة الملخص التنفيذي
            const executiveSummaryData = [
                ['دراسة جدوى ورشة تصنيع المعدات الزراعية المبتكرة'],
                [''],
                ['الملخص التنفيذي'],
                ['اسم المشروع', document.querySelector('input[name="project_name"]').value || ''],
                ['المكان المقترح', document.querySelector('input[name="location"]').value || ''],
                ['ملخص المشروع', document.querySelector('textarea[name="summary"]').value || ''],
                ['التكلفة التقديرية الإجمالية', document.querySelector('input[name="total_cost"]').value || '', 'دولار'],
                ['المدة المتوقعة لاسترداد رأس المال', document.querySelector('input[name="payback_period"]').value || '', 'سنوات'],
                ['الفئة المستهدفة', document.querySelector('input[name="target_audience"]').value || ''],
                ['المزايا التنافسية الرئيسية', document.querySelector('textarea[name="competitive_advantages"]').value || '']
            ];
            
            const executiveSummaryWS = XLSX.utils.aoa_to_sheet(executiveSummaryData);
            XLSX.utils.book_append_sheet(wb, executiveSummaryWS, 'الملخص التنفيذي');
            
            // ورقة المنتجات
            const productsData = [
                ['المنتجات/المعدات الزراعية'],
                [''],
                ['اسم المنتج', 'الوصف', 'السعر التقديري (دولار)']
            ];
            
            const products = Array.from(document.querySelectorAll('#products-container .product-item'));
            products.forEach(product => {
                productsData.push([
                    product.querySelector('input[name="product_name[]"]').value,
                    product.querySelector('input[name="product_description[]"]').value,
                    product.querySelector('input[name="product_price[]"]').value
                ]);
            });
            
            const productsWS = XLSX.utils.aoa_to_sheet(productsData);
            XLSX.utils.book_append_sheet(wb, productsWS, 'المنتجات');
            
            // ورقة تحليل السوق
            const marketAnalysisData = [
                ['تحليل السوق'],
                [''],
                ['نظرة عامة على السوق', document.querySelector('textarea[name="market_overview"]').value || ''],
                [''],
                ['الطلب المتوقع'],
                ['السنة', 'الطلب (وحدة)'],
                ['السنة الأولى', document.getElementById('demand-year1-value').textContent],
                ['السنة الثانية', document.getElementById('demand-year2-value').textContent],
                ['السنة الثالثة', document.getElementById('demand-year3-value').textContent],
                [''],
                ['تحليل SWOT'],
                ['نقاط القوة', document.querySelector('textarea[name="swot_strengths"]').value || ''],
                ['نقاط الضعف', document.querySelector('textarea[name="swot_weaknesses"]').value || ''],
                ['الفرص', document.querySelector('textarea[name="swot_opportunities"]').value || ''],
                ['التهديدات', document.querySelector('textarea[name="swot_threats"]').value || '']
            ];
            
            const marketAnalysisWS = XLSX.utils.aoa_to_sheet(marketAnalysisData);
            XLSX.utils.book_append_sheet(wb, marketAnalysisWS, 'تحليل السوق');
            
            // إضافة المزيد من الأوراق حسب الحاجة
            
            // توليد الملف
            XLSX.writeFile(wb, `دراسة_جدوى_${projectName.replace(/\s+/g, '_')}.xlsx`);
            
            hideLoading();
            showNotification('تم توليد ملف Excel بنجاح');
        } catch (error) {
            console.error('Error generating Excel file:', error);
            hideLoading();
            showNotification('حدث خطأ أثناء إنشاء ملف Excel', true);
        }
    }, 500);
}

// ===== عرض/إخفاء التحميل =====
function showLoading(text = 'جاري التحميل...') {
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');
    
    if (loadingOverlay && loadingText) {
        loadingText.textContent = text;
        loadingOverlay.classList.remove('hidden');
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }
}

// ===== عرض الإشعارات =====
function showNotification(text, isError = false) {
    const notificationToast = document.getElementById('notification-toast');
    const notificationText = document.getElementById('notification-text');
    const notificationIcon = document.getElementById('notification-icon');
    const closeNotification = document.getElementById('close-notification');
    
    if (notificationToast && notificationText && notificationIcon) {
        notificationText.textContent = text;
        
        if (isError) {
            notificationIcon.innerHTML = '<i class="fas fa-exclamation-circle text-red-500 text-xl"></i>';
        } else {
            notificationIcon.innerHTML = '<i class="fas fa-check-circle text-green-500 text-xl"></i>';
        }
        
        notificationToast.classList.remove('hidden');
        
        // إخفاء الإشعار تلقائياً بعد 5 ثوانٍ
        setTimeout(() => {
            notificationToast.classList.add('hidden');
        }, 5000);
        
        // إضافة مستمع حدث لزر الإغلاق
        if (closeNotification) {
            closeNotification.addEventListener('click', function() {
                notificationToast.classList.add('hidden');
            });
        }
    }
}
