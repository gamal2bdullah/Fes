// ميزات الذكاء الاصطناعي مع ضمان الخصوصية
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة ميزات الذكاء الاصطناعي
    initAIFeatures();
});

// ===== تهيئة ميزات الذكاء الاصطناعي =====
function initAIFeatures() {
    // تهيئة نموذج الذكاء الاصطناعي المحلي
    initLocalAIModel();
    
    // تهيئة نظام التوصيات الذكية
    initSmartRecommendations();
    
    // تهيئة نظام التنبؤ بالمخاطر
    initRiskPrediction();
    
    // تهيئة نظام تحليل السوق
    initMarketAnalysis();
    
    // تهيئة نظام تحسين المشروع
    initProjectOptimization();
    
    // إضافة مستمعي الأحداث لميزات الذكاء الاصطناعي
    setupAIEventListeners();
}

// ===== تهيئة نموذج الذكاء الاصطناعي المحلي =====
function initLocalAIModel() {
    console.log("تهيئة نموذج الذكاء الاصطناعي المحلي...");
    
    // إنشاء كائن النموذج المحلي
    window.localAIModel = {
        // مصفوفة القواعد المعرفية للتوصيات
        knowledgeBase: {
            marketAnalysis: [
                { condition: "market_size < 1000000", recommendation: "السوق صغير نسبياً، يُنصح بالتركيز على شريحة محددة من العملاء والتميز فيها" },
                { condition: "market_size >= 1000000 && market_size < 5000000", recommendation: "حجم السوق متوسط، يمكن التوسع تدريجياً مع الحفاظ على جودة المنتج/الخدمة" },
                { condition: "market_size >= 5000000", recommendation: "السوق كبير، يمكن التفكير في استراتيجيات توسع أكثر جرأة وتنويع المنتجات/الخدمات" },
                { condition: "competition_level > 4", recommendation: "المنافسة قوية، يجب التركيز على نقاط تمايز واضحة وفريدة" },
                { condition: "competition_level <= 2", recommendation: "المنافسة ضعيفة، فرصة جيدة للدخول بقوة وتأسيس حصة سوقية كبيرة" }
            ],
            financialAnalysis: [
                { condition: "roi < 15", recommendation: "معدل العائد على الاستثمار منخفض، يجب إعادة النظر في هيكل التكاليف أو زيادة الإيرادات" },
                { condition: "roi >= 15 && roi < 25", recommendation: "معدل العائد على الاستثمار مقبول، لكن يمكن تحسينه من خلال تحسين الكفاءة التشغيلية" },
                { condition: "roi >= 25", recommendation: "معدل العائد على الاستثمار ممتاز، يمكن التفكير في توسيع المشروع" },
                { condition: "payback_period > 4", recommendation: "فترة استرداد رأس المال طويلة، يجب تقليل التكاليف الرأسمالية أو زيادة التدفقات النقدية" },
                { condition: "payback_period <= 2", recommendation: "فترة استرداد رأس المال قصيرة، مؤشر إيجابي على جدوى المشروع" }
            ],
            operationalAnalysis: [
                { condition: "fixed_costs > 0.6 * total_costs", recommendation: "التكاليف الثابتة مرتفعة نسبياً، يجب البحث عن طرق لتحويل بعضها إلى تكاليف متغيرة" },
                { condition: "variable_costs > 0.7 * total_costs", recommendation: "التكاليف المتغيرة مرتفعة، يمكن البحث عن موردين بأسعار أفضل أو تحسين كفاءة الإنتاج" },
                { condition: "break_even_units > 0.5 * max_capacity", recommendation: "نقطة التعادل مرتفعة، يجب تقليل التكاليف أو زيادة سعر البيع" },
                { condition: "break_even_units <= 0.3 * max_capacity", recommendation: "نقطة التعادل منخفضة، مؤشر إيجابي على هامش أمان جيد" }
            ],
            riskAnalysis: [
                { condition: "market_risk > 3.5", recommendation: "مخاطر السوق مرتفعة، يجب وضع خطط بديلة وتنويع مصادر الدخل" },
                { condition: "financial_risk > 3.5", recommendation: "المخاطر المالية مرتفعة، يجب تقليل الاعتماد على الديون وزيادة رأس المال" },
                { condition: "operational_risk > 3.5", recommendation: "المخاطر التشغيلية مرتفعة، يجب تحسين العمليات وتدريب الموظفين" },
                { condition: "legal_risk > 3", recommendation: "المخاطر القانونية مرتفعة، يجب استشارة خبراء قانونيين وتحسين الامتثال" }
            ]
        },
        
        // نماذج التنبؤ المبسطة
        predictionModels: {
            // نموذج التنبؤ بالطلب
            demandPrediction: function(historicalData, marketGrowth, seasonality) {
                // حساب متوسط النمو من البيانات التاريخية
                let avgGrowth = 0;
                if (historicalData && historicalData.length > 1) {
                    for (let i = 1; i < historicalData.length; i++) {
                        avgGrowth += (historicalData[i] - historicalData[i-1]) / historicalData[i-1];
                    }
                    avgGrowth = avgGrowth / (historicalData.length - 1);
                }
                
                // تعديل معدل النمو بناءً على نمو السوق والموسمية
                const adjustedGrowth = avgGrowth + (marketGrowth / 100) + (seasonality / 10);
                
                // التنبؤ بالطلب للسنوات القادمة
                const futureDemand = [];
                const lastValue = historicalData[historicalData.length - 1];
                
                for (let year = 1; year <= 5; year++) {
                    const predictedValue = lastValue * Math.pow(1 + adjustedGrowth, year);
                    futureDemand.push(Math.round(predictedValue));
                }
                
                return futureDemand;
            },
            
            // نموذج تقييم المخاطر
            riskAssessment: function(marketRisk, financialRisk, operationalRisk, legalRisk) {
                // حساب درجة المخاطرة الإجمالية (مقياس من 1 إلى 5)
                const weights = [0.3, 0.3, 0.25, 0.15]; // أوزان لكل نوع من المخاطر
                const riskFactors = [marketRisk, financialRisk, operationalRisk, legalRisk];
                
                let overallRisk = 0;
                for (let i = 0; i < riskFactors.length; i++) {
                    overallRisk += riskFactors[i] * weights[i];
                }
                
                // تصنيف المخاطر
                let riskCategory = "";
                let recommendations = [];
                
                if (overallRisk < 2) {
                    riskCategory = "منخفضة";
                    recommendations.push("المخاطر الإجمالية منخفضة، يمكن المضي قدماً في المشروع مع المراقبة الدورية");
                } else if (overallRisk < 3) {
                    riskCategory = "متوسطة منخفضة";
                    recommendations.push("المخاطر الإجمالية متوسطة منخفضة، يجب وضع خطط للتعامل مع المخاطر الأعلى");
                } else if (overallRisk < 4) {
                    riskCategory = "متوسطة";
                    recommendations.push("المخاطر الإجمالية متوسطة، يجب تخفيف المخاطر الرئيسية قبل البدء");
                } else if (overallRisk < 4.5) {
                    riskCategory = "متوسطة مرتفعة";
                    recommendations.push("المخاطر الإجمالية متوسطة مرتفعة، يجب إعادة تقييم جوانب المشروع عالية المخاطر");
                } else {
                    riskCategory = "مرتفعة";
                    recommendations.push("المخاطر الإجمالية مرتفعة، يجب إعادة النظر في جدوى المشروع أو تغيير النموذج التجاري");
                }
                
                // إضافة توصيات محددة بناءً على عوامل المخاطرة الفردية
                if (marketRisk > 3.5) {
                    recommendations.push("مخاطر السوق مرتفعة: يجب إجراء دراسة سوق أكثر تفصيلاً وتحليل المنافسين بدقة");
                }
                if (financialRisk > 3.5) {
                    recommendations.push("المخاطر المالية مرتفعة: يجب تقليل الاعتماد على التمويل الخارجي وتحسين التدفق النقدي");
                }
                if (operationalRisk > 3.5) {
                    recommendations.push("المخاطر التشغيلية مرتفعة: يجب تحسين العمليات وتدريب الموظفين وتطوير أنظمة الرقابة");
                }
                if (legalRisk > 3) {
                    recommendations.push("المخاطر القانونية مرتفعة: يجب استشارة خبراء قانونيين وتحسين الامتثال للقوانين واللوائح");
                }
                
                return {
                    overallRisk: overallRisk.toFixed(2),
                    riskCategory: riskCategory,
                    recommendations: recommendations
                };
            },
            
            // نموذج تحسين المشروع
            projectOptimization: function(projectData) {
                const recommendations = [];
                
                // تحليل هيكل التكاليف
                if (projectData.fixedCosts && projectData.variableCosts) {
                    const totalCosts = projectData.fixedCosts + projectData.variableCosts;
                    const fixedCostsRatio = projectData.fixedCosts / totalCosts;
                    
                    if (fixedCostsRatio > 0.7) {
                        recommendations.push("التكاليف الثابتة تشكل نسبة كبيرة من إجمالي التكاليف. يمكن تحسين المرونة المالية من خلال تحويل بعض التكاليف الثابتة إلى متغيرة (مثل الاستعانة بمصادر خارجية بدلاً من التوظيف الدائم).");
                    } else if (fixedCostsRatio < 0.3) {
                        recommendations.push("التكاليف المتغيرة تشكل نسبة كبيرة من إجمالي التكاليف. يمكن تحسين الكفاءة من خلال الاستثمار في أصول ثابتة لتقليل التكاليف المتغيرة على المدى الطويل.");
                    }
                }
                
                // تحليل التسعير
                if (projectData.unitPrice && projectData.unitCost) {
                    const profitMargin = (projectData.unitPrice - projectData.unitCost) / projectData.unitPrice;
                    
                    if (profitMargin < 0.2) {
                        recommendations.push("هامش الربح منخفض نسبياً. يمكن تحسينه من خلال زيادة سعر البيع أو تقليل تكلفة الوحدة أو التركيز على منتجات/خدمات ذات قيمة مضافة أعلى.");
                    } else if (profitMargin > 0.6) {
                        recommendations.push("هامش الربح مرتفع جداً. هذا إيجابي، لكن قد يجذب منافسين جدد. يمكن النظر في استراتيجية تسعير أكثر تنافسية لزيادة الحصة السوقية.");
                    }
                }
                
                // تحليل نقطة التعادل
                if (projectData.breakEvenUnits && projectData.expectedDemand) {
                    const breakEvenRatio = projectData.breakEvenUnits / projectData.expectedDemand;
                    
                    if (breakEvenRatio > 0.7) {
                        recommendations.push("نقطة التعادل قريبة من الطلب المتوقع، مما يشير إلى هامش أمان منخفض. يمكن تحسين ذلك من خلال تقليل التكاليف الثابتة أو زيادة هامش المساهمة.");
                    } else if (breakEvenRatio < 0.4) {
                        recommendations.push("نقطة التعادل منخفضة مقارنة بالطلب المتوقع، مما يشير إلى هامش أمان جيد. يمكن النظر في استراتيجيات نمو أكثر جرأة.");
                    }
                }
                
                // تحليل التمويل
                if (projectData.debtRatio) {
                    if (projectData.debtRatio > 0.6) {
                        recommendations.push("نسبة الدين مرتفعة. يمكن تحسين الهيكل المالي من خلال زيادة رأس المال أو إعادة استثمار الأرباح بدلاً من الاقتراض الإضافي.");
                    } else if (projectData.debtRatio < 0.2) {
                        recommendations.push("نسبة الدين منخفضة. يمكن الاستفادة من الرافعة المالية لتسريع النمو، خاصة إذا كانت تكلفة الدين أقل من العائد المتوقع.");
                    }
                }
                
                // تحليل الموارد البشرية
                if (projectData.employeesCount && projectData.revenue) {
                    const revenuePerEmployee = projectData.revenue / projectData.employeesCount;
                    
                    if (revenuePerEmployee < projectData.industryAvgRevenuePerEmployee) {
                        recommendations.push("الإيرادات لكل موظف أقل من متوسط الصناعة. يمكن تحسين الإنتاجية من خلال التدريب أو الأتمتة أو إعادة هيكلة العمليات.");
                    }
                }
                
                return recommendations;
            }
        },
        
        // معالجة البيانات محلياً (بدون إرسال للخوادم)
        processDataLocally: function(data, analysisType) {
            console.log("معالجة البيانات محلياً...");
            
            let result = null;
            
            switch (analysisType) {
                case 'recommendations':
                    result = this.generateRecommendations(data);
                    break;
                case 'risk_prediction':
                    result = this.predictionModels.riskAssessment(
                        data.marketRisk,
                        data.financialRisk,
                        data.operationalRisk,
                        data.legalRisk
                    );
                    break;
                case 'demand_prediction':
                    result = this.predictionModels.demandPrediction(
                        data.historicalData,
                        data.marketGrowth,
                        data.seasonality
                    );
                    break;
                case 'project_optimization':
                    result = this.predictionModels.projectOptimization(data);
                    break;
                default:
                    console.error("نوع التحليل غير معروف:", analysisType);
            }
            
            return result;
        },
        
        // توليد التوصيات بناءً على البيانات والقواعد المعرفية
        generateRecommendations: function(data) {
            console.log("توليد التوصيات...");
            
            const recommendations = [];
            
            // فحص قواعد تحليل السوق
            this.knowledgeBase.marketAnalysis.forEach(rule => {
                // تحويل شرط القاعدة إلى دالة قابلة للتنفيذ
                const conditionFunction = new Function('market_size', 'competition_level', 'return ' + rule.condition);
                
                // تقييم الشرط باستخدام بيانات المشروع
                if (conditionFunction(data.marketSize, data.competitionLevel)) {
                    recommendations.push({
                        category: 'تحليل السوق',
                        recommendation: rule.recommendation
                    });
                }
            });
            
            // فحص قواعد التحليل المالي
            this.knowledgeBase.financialAnalysis.forEach(rule => {
                // تحويل شرط القاعدة إلى دالة قابلة للتنفيذ
                const conditionFunction = new Function('roi', 'payback_period', 'return ' + rule.condition);
                
                // تقييم الشرط باستخدام بيانات المشروع
                if (conditionFunction(data.roi, data.paybackPeriod)) {
                    recommendations.push({
                        category: 'التحليل المالي',
                        recommendation: rule.recommendation
                    });
                }
            });
            
            // فحص قواعد التحليل التشغيلي
            this.knowledgeBase.operationalAnalysis.forEach(rule => {
                // تحويل شرط القاعدة إلى دالة قابلة للتنفيذ
                const conditionFunction = new Function(
                    'fixed_costs', 'variable_costs', 'total_costs', 'break_even_units', 'max_capacity',
                    'return ' + rule.condition
                );
                
                // تقييم الشرط باستخدام بيانات المشروع
                if (conditionFunction(
                    data.fixedCosts,
                    data.variableCosts,
                    data.totalCosts,
                    data.breakEvenUnits,
                    data.maxCapacity
                )) {
                    recommendations.push({
                        category: 'التحليل التشغيلي',
                        recommendation: rule.recommendation
                    });
                }
            });
            
            // فحص قواعد تحليل المخاطر
            this.knowledgeBase.riskAnalysis.forEach(rule => {
                // تحويل شرط القاعدة إلى دالة قابلة للتنفيذ
                const conditionFunction = new Function(
                    'market_risk', 'financial_risk', 'operational_risk', 'legal_risk',
                    'return ' + rule.condition
                );
                
                // تقييم الشرط باستخدام بيانات المشروع
                if (conditionFunction(
                    data.marketRisk,
                    data.financialRisk,
                    data.operationalRisk,
                    data.legalRisk
                )) {
                    recommendations.push({
                        category: 'تحليل المخاطر',
                        recommendation: rule.recommendation
                    });
                }
            });
            
            return recommendations;
        }
    };
}

// ===== تهيئة نظام التوصيات الذكية =====
function initSmartRecommendations() {
    console.log("تهيئة نظام التوصيات الذكية...");
    
    // إضافة مستمع الأحداث لزر التوصيات
    const recommendationsBtn = document.getElementById('get-recommendations-btn');
    
    if (recommendationsBtn) {
        recommendationsBtn.addEventListener('click', function() {
            // جمع بيانات المشروع من النموذج
            const projectData = collectProjectData();
            
            // معالجة البيانات محلياً وتوليد التوصيات
            const recommendations = window.localAIModel.processDataLocally(projectData, 'recommendations');
            
            // عرض التوصيات
            displayRecommendations(recommendations);
        });
    }
}

// ===== تهيئة نظام التنبؤ بالمخاطر =====
function initRiskPrediction() {
    console.log("تهيئة نظام التنبؤ بالمخاطر...");
    
    // إضافة مستمع الأحداث لزر تحليل المخاطر
    const riskAnalysisBtn = document.getElementById('risk-analysis-btn');
    
    if (riskAnalysisBtn) {
        riskAnalysisBtn.addEventListener('click', function() {
            // جمع بيانات المخاطر من النموذج
            const riskData = collectRiskData();
            
            // معالجة البيانات محلياً وتوليد تقييم المخاطر
            const riskAssessment = window.localAIModel.processDataLocally(riskData, 'risk_prediction');
            
            // عرض تقييم المخاطر
            displayRiskAssessment(riskAssessment);
        });
    }
}

// ===== تهيئة نظام تحليل السوق =====
function initMarketAnalysis() {
    console.log("تهيئة نظام تحليل السوق...");
    
    // إضافة مستمع الأحداث لزر تحليل السوق
    const marketAnalysisBtn = document.getElementById('market-analysis-btn');
    
    if (marketAnalysisBtn) {
        marketAnalysisBtn.addEventListener('click', function() {
            // جمع بيانات السوق من النموذج
            const marketData = collectMarketData();
            
            // معالجة البيانات محلياً وتوليد التنبؤ بالطلب
            const demandPrediction = window.localAIModel.processDataLocally(marketData, 'demand_prediction');
            
            // عرض التنبؤ بالطلب
            displayDemandPrediction(demandPrediction);
        });
    }
}

// ===== تهيئة نظام تحسين المشروع =====
function initProjectOptimization() {
    console.log("تهيئة نظام تحسين المشروع...");
    
    // إضافة مستمع الأحداث لزر تحسين المشروع
    const projectOptimizationBtn = document.getElementById('project-optimization-btn');
    
    if (projectOptimizationBtn) {
        projectOptimizationBtn.addEventListener('click', function() {
            // جمع بيانات المشروع من النموذج
            const projectData = collectProjectData();
            
            // معالجة البيانات محلياً وتوليد توصيات التحسين
            const optimizationRecommendations = window.localAIModel.processDataLocally(projectData, 'project_optimization');
            
            // عرض توصيات التحسين
            displayOptimizationRecommendations(optimizationRecommendations);
        });
    }
}

// ===== جمع بيانات المشروع من النموذج =====
function collectProjectData() {
    // جمع البيانات من حقول النموذج
    return {
        // بيانات السوق
        marketSize: parseFloat(document.getElementById('market-size').value || 0),
        competitionLevel: parseFloat(document.getElementById('competition-level').value || 0),
        
        // بيانات مالية
        roi: parseFloat(document.getElementById('roi').value || 0),
        paybackPeriod: parseFloat(document.getElementById('payback-period').value || 0),
        
        // بيانات تشغيلية
        fixedCosts: parseFloat(document.getElementById('fixed-costs').value || 0),
        variableCosts: parseFloat(document.getElementById('variable-costs').value || 0),
        totalCosts: parseFloat(document.getElementById('total-costs').value || 0),
        breakEvenUnits: parseFloat(document.getElementById('break-even-units').value || 0),
        maxCapacity: parseFloat(document.getElementById('max-capacity').value || 0),
        
        // بيانات إضافية
        unitPrice: parseFloat(document.getElementById('unit-price').value || 0),
        unitCost: parseFloat(document.getElementById('unit-cost').value || 0),
        expectedDemand: parseFloat(document.getElementById('expected-demand').value || 0),
        debtRatio: parseFloat(document.getElementById('debt-ratio').value || 0),
        employeesCount: parseFloat(document.getElementById('employees-count').value || 0),
        revenue: parseFloat(document.getElementById('revenue').value || 0),
        industryAvgRevenuePerEmployee: parseFloat(document.getElementById('industry-avg-revenue-per-employee').value || 0)
    };
}

// ===== جمع بيانات المخاطر من النموذج =====
function collectRiskData() {
    // جمع بيانات المخاطر من حقول النموذج
    return {
        marketRisk: parseFloat(document.getElementById('market-risk').value || 0),
        financialRisk: parseFloat(document.getElementById('financial-risk').value || 0),
        operationalRisk: parseFloat(document.getElementById('operational-risk').value || 0),
        legalRisk: parseFloat(document.getElementById('legal-risk').value || 0)
    };
}

// ===== جمع بيانات السوق من النموذج =====
function collectMarketData() {
    // جمع البيانات التاريخية للطلب
    const historicalDataInputs = document.querySelectorAll('[id^="historical-demand-"]');
    const historicalData = [];
    
    historicalDataInputs.forEach(input => {
        historicalData.push(parseFloat(input.value || 0));
    });
    
    // جمع بيانات السوق الأخرى
    return {
        historicalData: historicalData,
        marketGrowth: parseFloat(document.getElementById('market-growth').value || 0),
        seasonality: parseFloat(document.getElementById('seasonality').value || 0)
    };
}

// ===== عرض التوصيات =====
function displayRecommendations(recommendations) {
    const recommendationsContainer = document.getElementById('recommendations-container');
    
    if (recommendationsContainer) {
        // مسح المحتوى السابق
        recommendationsContainer.innerHTML = '';
        
        // إنشاء عنوان
        const title = document.createElement('h3');
        title.textContent = 'التوصيات الذكية';
        title.className = 'recommendations-title';
        recommendationsContainer.appendChild(title);
        
        // إنشاء قائمة التوصيات
        if (recommendations && recommendations.length > 0) {
            const list = document.createElement('ul');
            list.className = 'recommendations-list';
            
            // تجميع التوصيات حسب الفئة
            const categorizedRecommendations = {};
            
            recommendations.forEach(item => {
                if (!categorizedRecommendations[item.category]) {
                    categorizedRecommendations[item.category] = [];
                }
                
                categorizedRecommendations[item.category].push(item.recommendation);
            });
            
            // إنشاء عناصر القائمة
            for (const category in categorizedRecommendations) {
                const categoryItem = document.createElement('li');
                categoryItem.className = 'recommendation-category';
                
                const categoryTitle = document.createElement('strong');
                categoryTitle.textContent = category + ':';
                categoryItem.appendChild(categoryTitle);
                
                const categoryList = document.createElement('ul');
                
                categorizedRecommendations[category].forEach(recommendation => {
                    const recommendationItem = document.createElement('li');
                    recommendationItem.textContent = recommendation;
                    categoryList.appendChild(recommendationItem);
                });
                
                categoryItem.appendChild(categoryList);
                list.appendChild(categoryItem);
            }
            
            recommendationsContainer.appendChild(list);
        } else {
            // عرض رسالة إذا لم تكن هناك توصيات
            const message = document.createElement('p');
            message.textContent = 'لا توجد توصيات متاحة. يرجى إدخال المزيد من بيانات المشروع.';
            message.className = 'no-recommendations';
            recommendationsContainer.appendChild(message);
        }
        
        // إضافة ملاحظة حول خصوصية البيانات
        const privacyNote = document.createElement('p');
        privacyNote.textContent = 'ملاحظة: جميع التحليلات تتم محلياً على جهازك ولا يتم إرسال أي بيانات إلى الخوادم.';
        privacyNote.className = 'privacy-note';
        recommendationsContainer.appendChild(privacyNote);
        
        // عرض القسم
        recommendationsContainer.style.display = 'block';
        
        // التمرير إلى القسم
        recommendationsContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== عرض تقييم المخاطر =====
function displayRiskAssessment(riskAssessment) {
    const riskContainer = document.getElementById('risk-assessment-container');
    
    if (riskContainer) {
        // مسح المحتوى السابق
        riskContainer.innerHTML = '';
        
        // إنشاء عنوان
        const title = document.createElement('h3');
        title.textContent = 'تقييم المخاطر';
        title.className = 'risk-title';
        riskContainer.appendChild(title);
        
        // إنشاء قسم درجة المخاطرة
        const riskLevelSection = document.createElement('div');
        riskLevelSection.className = 'risk-level-section';
        
        const riskLevelTitle = document.createElement('h4');
        riskLevelTitle.textContent = 'درجة المخاطرة الإجمالية:';
        riskLevelSection.appendChild(riskLevelTitle);
        
        const riskLevelValue = document.createElement('div');
        riskLevelValue.className = 'risk-level-value ' + getRiskLevelClass(riskAssessment.overallRisk);
        riskLevelValue.textContent = riskAssessment.overallRisk + ' - ' + riskAssessment.riskCategory;
        riskLevelSection.appendChild(riskLevelValue);
        
        riskContainer.appendChild(riskLevelSection);
        
        // إنشاء قسم التوصيات
        const recommendationsSection = document.createElement('div');
        recommendationsSection.className = 'risk-recommendations-section';
        
        const recommendationsTitle = document.createElement('h4');
        recommendationsTitle.textContent = 'التوصيات:';
        recommendationsSection.appendChild(recommendationsTitle);
        
        const recommendationsList = document.createElement('ul');
        recommendationsList.className = 'risk-recommendations-list';
        
        riskAssessment.recommendations.forEach(recommendation => {
            const recommendationItem = document.createElement('li');
            recommendationItem.textContent = recommendation;
            recommendationsList.appendChild(recommendationItem);
        });
        
        recommendationsSection.appendChild(recommendationsList);
        riskContainer.appendChild(recommendationsSection);
        
        // إضافة ملاحظة حول خصوصية البيانات
        const privacyNote = document.createElement('p');
        privacyNote.textContent = 'ملاحظة: جميع التحليلات تتم محلياً على جهازك ولا يتم إرسال أي بيانات إلى الخوادم.';
        privacyNote.className = 'privacy-note';
        riskContainer.appendChild(privacyNote);
        
        // عرض القسم
        riskContainer.style.display = 'block';
        
        // التمرير إلى القسم
        riskContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== الحصول على فئة CSS لدرجة المخاطرة =====
function getRiskLevelClass(riskLevel) {
    const level = parseFloat(riskLevel);
    
    if (level < 2) {
        return 'risk-low';
    } else if (level < 3) {
        return 'risk-medium-low';
    } else if (level < 4) {
        return 'risk-medium';
    } else if (level < 4.5) {
        return 'risk-medium-high';
    } else {
        return 'risk-high';
    }
}

// ===== عرض التنبؤ بالطلب =====
function displayDemandPrediction(demandPrediction) {
    const demandContainer = document.getElementById('demand-prediction-container');
    
    if (demandContainer) {
        // مسح المحتوى السابق
        demandContainer.innerHTML = '';
        
        // إنشاء عنوان
        const title = document.createElement('h3');
        title.textContent = 'التنبؤ بالطلب';
        title.className = 'demand-title';
        demandContainer.appendChild(title);
        
        // إنشاء جدول التنبؤ
        const table = document.createElement('table');
        table.className = 'demand-prediction-table';
        
        // إنشاء رأس الجدول
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const yearHeader = document.createElement('th');
        yearHeader.textContent = 'السنة';
        headerRow.appendChild(yearHeader);
        
        const demandHeader = document.createElement('th');
        demandHeader.textContent = 'الطلب المتوقع';
        headerRow.appendChild(demandHeader);
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // إنشاء جسم الجدول
        const tbody = document.createElement('tbody');
        
        demandPrediction.forEach((demand, index) => {
            const row = document.createElement('tr');
            
            const yearCell = document.createElement('td');
            yearCell.textContent = 'السنة ' + (index + 1);
            row.appendChild(yearCell);
            
            const demandCell = document.createElement('td');
            demandCell.textContent = demand.toLocaleString() + ' وحدة';
            row.appendChild(demandCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        demandContainer.appendChild(table);
        
        // تحديث مخطط الطلب المتوقع إذا كان موجوداً
        if (window.demandChart) {
            window.demandChart.data.datasets[0].data = demandPrediction;
            window.demandChart.update();
        }
        
        // إضافة ملاحظة حول خصوصية البيانات
        const privacyNote = document.createElement('p');
        privacyNote.textContent = 'ملاحظة: جميع التحليلات تتم محلياً على جهازك ولا يتم إرسال أي بيانات إلى الخوادم.';
        privacyNote.className = 'privacy-note';
        demandContainer.appendChild(privacyNote);
        
        // عرض القسم
        demandContainer.style.display = 'block';
        
        // التمرير إلى القسم
        demandContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== عرض توصيات تحسين المشروع =====
function displayOptimizationRecommendations(recommendations) {
    const optimizationContainer = document.getElementById('optimization-container');
    
    if (optimizationContainer) {
        // مسح المحتوى السابق
        optimizationContainer.innerHTML = '';
        
        // إنشاء عنوان
        const title = document.createElement('h3');
        title.textContent = 'توصيات تحسين المشروع';
        title.className = 'optimization-title';
        optimizationContainer.appendChild(title);
        
        // إنشاء قائمة التوصيات
        if (recommendations && recommendations.length > 0) {
            const list = document.createElement('ul');
            list.className = 'optimization-list';
            
            recommendations.forEach(recommendation => {
                const item = document.createElement('li');
                item.textContent = recommendation;
                list.appendChild(item);
            });
            
            optimizationContainer.appendChild(list);
        } else {
            // عرض رسالة إذا لم تكن هناك توصيات
            const message = document.createElement('p');
            message.textContent = 'لا توجد توصيات متاحة لتحسين المشروع. يرجى إدخال المزيد من بيانات المشروع.';
            message.className = 'no-recommendations';
            optimizationContainer.appendChild(message);
        }
        
        // إضافة ملاحظة حول خصوصية البيانات
        const privacyNote = document.createElement('p');
        privacyNote.textContent = 'ملاحظة: جميع التحليلات تتم محلياً على جهازك ولا يتم إرسال أي بيانات إلى الخوادم.';
        privacyNote.className = 'privacy-note';
        optimizationContainer.appendChild(privacyNote);
        
        // عرض القسم
        optimizationContainer.style.display = 'block';
        
        // التمرير إلى القسم
        optimizationContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== إضافة مستمعي الأحداث لميزات الذكاء الاصطناعي =====
function setupAIEventListeners() {
    // إضافة مستمع الأحداث لزر المساعد الذكي
    const aiAssistantBtn = document.getElementById('ai-assistant-btn');
    
    if (aiAssistantBtn) {
        aiAssistantBtn.addEventListener('click', function() {
            // فتح نافذة المساعد الذكي
            openAIAssistantModal();
        });
    }
    
    // إضافة مستمع الأحداث لزر إغلاق نافذة المساعد الذكي
    const closeAIAssistantBtn = document.getElementById('close-ai-assistant');
    
    if (closeAIAssistantBtn) {
        closeAIAssistantBtn.addEventListener('click', function() {
            // إغلاق نافذة المساعد الذكي
            closeAIAssistantModal();
        });
    }
    
    // إضافة مستمع الأحداث لزر إرسال السؤال
    const sendQuestionBtn = document.getElementById('send-question-btn');
    
    if (sendQuestionBtn) {
        sendQuestionBtn.addEventListener('click', function() {
            // إرسال السؤال إلى المساعد الذكي
            sendQuestionToAIAssistant();
        });
    }
    
    // إضافة مستمع الأحداث لحقل السؤال (للضغط على Enter)
    const questionInput = document.getElementById('ai-question-input');
    
    if (questionInput) {
        questionInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                // إرسال السؤال إلى المساعد الذكي
                sendQuestionToAIAssistant();
            }
        });
    }
}

// ===== فتح نافذة المساعد الذكي =====
function openAIAssistantModal() {
    const aiAssistantModal = document.getElementById('ai-assistant-modal');
    
    if (aiAssistantModal) {
        aiAssistantModal.style.display = 'block';
        
        // التركيز على حقل السؤال
        const questionInput = document.getElementById('ai-question-input');
        if (questionInput) {
            questionInput.focus();
        }
        
        // إضافة رسالة ترحيب
        const chatContainer = document.getElementById('ai-chat-container');
        if (chatContainer && chatContainer.children.length === 0) {
            addAIMessage('مرحباً! أنا المساعد الذكي لدراسة الجدوى. كيف يمكنني مساعدتك اليوم؟');
        }
    }
}

// ===== إغلاق نافذة المساعد الذكي =====
function closeAIAssistantModal() {
    const aiAssistantModal = document.getElementById('ai-assistant-modal');
    
    if (aiAssistantModal) {
        aiAssistantModal.style.display = 'none';
    }
}

// ===== إرسال السؤال إلى المساعد الذكي =====
function sendQuestionToAIAssistant() {
    const questionInput = document.getElementById('ai-question-input');
    
    if (questionInput && questionInput.value.trim() !== '') {
        const question = questionInput.value.trim();
        
        // إضافة سؤال المستخدم إلى المحادثة
        addUserMessage(question);
        
        // مسح حقل السؤال
        questionInput.value = '';
        
        // معالجة السؤال محلياً
        processQuestionLocally(question);
    }
}

// ===== إضافة رسالة المستخدم إلى المحادثة =====
function addUserMessage(message) {
    const chatContainer = document.getElementById('ai-chat-container');
    
    if (chatContainer) {
        const messageElement = document.createElement('div');
        messageElement.className = 'user-message';
        messageElement.textContent = message;
        
        chatContainer.appendChild(messageElement);
        
        // التمرير إلى أسفل المحادثة
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// ===== إضافة رسالة المساعد الذكي إلى المحادثة =====
function addAIMessage(message) {
    const chatContainer = document.getElementById('ai-chat-container');
    
    if (chatContainer) {
        const messageElement = document.createElement('div');
        messageElement.className = 'ai-message';
        
        // إضافة تأثير الكتابة
        let i = 0;
        const typingEffect = setInterval(function() {
            if (i < message.length) {
                messageElement.textContent += message.charAt(i);
                chatContainer.scrollTop = chatContainer.scrollHeight;
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 20);
        
        chatContainer.appendChild(messageElement);
        
        // التمرير إلى أسفل المحادثة
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// ===== معالجة السؤال محلياً =====
function processQuestionLocally(question) {
    // إظهار مؤشر الكتابة
    showTypingIndicator();
    
    // تأخير بسيط لمحاكاة المعالجة
    setTimeout(function() {
        // إخفاء مؤشر الكتابة
        hideTypingIndicator();
        
        // الحصول على الإجابة من قاعدة المعرفة المحلية
        const answer = getAnswerFromLocalKnowledgeBase(question);
        
        // إضافة إجابة المساعد الذكي إلى المحادثة
        addAIMessage(answer);
    }, 1000);
}

// ===== إظهار مؤشر الكتابة =====
function showTypingIndicator() {
    const chatContainer = document.getElementById('ai-chat-container');
    
    if (chatContainer) {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.id = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dot.className = 'typing-dot';
            typingIndicator.appendChild(dot);
        }
        
        chatContainer.appendChild(typingIndicator);
        
        // التمرير إلى أسفل المحادثة
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// ===== إخفاء مؤشر الكتابة =====
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// ===== الحصول على الإجابة من قاعدة المعرفة المحلية =====
function getAnswerFromLocalKnowledgeBase(question) {
    // تحويل السؤال إلى أحرف صغيرة للمقارنة
    const lowerQuestion = question.toLowerCase();
    
    // قاعدة المعرفة المحلية (أسئلة وأجوبة مسبقة)
    const knowledgeBase = [
        {
            keywords: ['ما هي', 'دراسة الجدوى', 'تعريف'],
            answer: 'دراسة الجدوى هي تحليل شامل للمشروع المقترح لتحديد ما إذا كان مجدياً من الناحية المالية والاقتصادية والفنية. تهدف إلى تقييم فرص نجاح المشروع وتحديد العوائد المتوقعة مقابل التكاليف والمخاطر.'
        },
        {
            keywords: ['كيف', 'حساب', 'نقطة التعادل'],
            answer: 'يتم حساب نقطة التعادل بقسمة التكاليف الثابتة على هامش المساهمة للوحدة (سعر بيع الوحدة - تكلفة الوحدة المتغيرة). الناتج هو عدد الوحدات التي يجب بيعها لتغطية جميع التكاليف دون تحقيق ربح أو خسارة.'
        },
        {
            keywords: ['ما هو', 'معدل العائد الداخلي', 'irr'],
            answer: 'معدل العائد الداخلي (IRR) هو معدل الخصم الذي يجعل صافي القيمة الحالية للمشروع يساوي صفر. يعتبر المشروع مجدياً إذا كان معدل العائد الداخلي أعلى من تكلفة رأس المال أو معدل العائد المطلوب.'
        },
        {
            keywords: ['كيف', 'حساب', 'صافي القيمة الحالية', 'npv'],
            answer: 'يتم حساب صافي القيمة الحالية (NPV) بخصم جميع التدفقات النقدية المستقبلية (الإيرادات والتكاليف) إلى قيمتها الحالية باستخدام معدل خصم مناسب، ثم طرح الاستثمار الأولي. إذا كانت النتيجة موجبة، فالمشروع مجدي اقتصادياً.'
        },
        {
            keywords: ['ما هي', 'فترة الاسترداد', 'payback'],
            answer: 'فترة الاسترداد هي الوقت اللازم لاسترداد الاستثمار الأولي من خلال التدفقات النقدية للمشروع. كلما كانت فترة الاسترداد أقصر، كان المشروع أكثر جاذبية من حيث السيولة والمخاطر.'
        },
        {
            keywords: ['كيف', 'تحليل الحساسية'],
            answer: 'تحليل الحساسية هو دراسة تأثير التغيرات في المتغيرات الرئيسية (مثل الإيرادات، التكاليف، معدل الخصم) على نتائج المشروع. يساعد في تحديد المتغيرات الأكثر تأثيراً على نجاح المشروع وتقييم المخاطر المرتبطة بها.'
        },
        {
            keywords: ['ما هي', 'مكونات', 'دراسة الجدوى'],
            answer: 'تتكون دراسة الجدوى عادة من: 1) دراسة السوق (تحليل الطلب والمنافسة) 2) الدراسة الفنية (المتطلبات التقنية والتشغيلية) 3) الدراسة المالية (التكاليف، الإيرادات، التدفقات النقدية) 4) الدراسة الاقتصادية (التأثير على الاقتصاد) 5) الدراسة القانونية والبيئية 6) تحليل المخاطر.'
        },
        {
            keywords: ['كيف', 'تقييم', 'المخاطر'],
            answer: 'يتم تقييم مخاطر المشروع من خلال: 1) تحديد المخاطر المحتملة (سوقية، مالية، تشغيلية، قانونية) 2) تقدير احتمالية حدوث كل خطر وتأثيره 3) حساب درجة المخاطرة الإجمالية 4) وضع استراتيجيات للتخفيف من المخاطر العالية 5) تحليل السيناريوهات المختلفة (متفائل، واقعي، متشائم).'
        },
        {
            keywords: ['ما هي', 'معايير', 'تقييم المشروع'],
            answer: 'من أهم معايير تقييم المشروع: 1) صافي القيمة الحالية (NPV) 2) معدل العائد الداخلي (IRR) 3) فترة الاسترداد 4) معدل العائد على الاستثمار (ROI) 5) نقطة التعادل 6) نسبة المنفعة إلى التكلفة 7) تحليل الحساسية 8) تحليل المخاطر.'
        },
        {
            keywords: ['كيف', 'تحسين', 'جدوى المشروع'],
            answer: 'يمكن تحسين جدوى المشروع من خلال: 1) تقليل التكاليف الثابتة والمتغيرة 2) زيادة الإيرادات (رفع الأسعار أو زيادة المبيعات) 3) تحسين كفاءة العمليات 4) تقليل الاستثمار الأولي 5) تحسين التدفقات النقدية 6) تقليل المخاطر 7) الاستفادة من الحوافز الحكومية والإعفاءات الضريبية.'
        }
    ];
    
    // البحث عن إجابة مناسبة
    for (const item of knowledgeBase) {
        // التحقق من وجود الكلمات المفتاحية في السؤال
        const matchCount = item.keywords.filter(keyword => lowerQuestion.includes(keyword)).length;
        
        // إذا كان هناك تطابق كافٍ، إرجاع الإجابة
        if (matchCount >= 2 || (matchCount === 1 && item.keywords.some(keyword => keyword.length > 5 && lowerQuestion.includes(keyword)))) {
            return item.answer;
        }
    }
    
    // إجابة افتراضية إذا لم يتم العثور على إجابة مناسبة
    return 'عذراً، لا أستطيع الإجابة على هذا السؤال حالياً. يمكنك طرح سؤال آخر متعلق بدراسة الجدوى أو استخدام أدوات التحليل المتاحة في التطبيق للحصول على معلومات أكثر تفصيلاً.';
}

// ===== تصدير الدوال =====
window.initAIFeatures = initAIFeatures;
window.initSmartRecommendations = initSmartRecommendations;
window.initRiskPrediction = initRiskPrediction;
window.initMarketAnalysis = initMarketAnalysis;
window.initProjectOptimization = initProjectOptimization;
window.openAIAssistantModal = openAIAssistantModal;
window.closeAIAssistantModal = closeAIAssistantModal;
window.sendQuestionToAIAssistant = sendQuestionToAIAssistant;
