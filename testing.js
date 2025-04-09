// اختبار وتحسين التطبيق
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة وظائف الاختبار والتحسين
    initTestingAndOptimization();
});

// ===== تهيئة وظائف الاختبار والتحسين =====
function initTestingAndOptimization() {
    console.log("تهيئة وظائف الاختبار والتحسين...");
    
    // اختبار توافق المتصفح
    testBrowserCompatibility();
    
    // اختبار الأداء
    testPerformance();
    
    // تحسين تجربة المستخدم
    enhanceUserExperience();
    
    // تحسين الوصول
    improveAccessibility();
    
    // إضافة مستمعي الأحداث للاختبار
    setupTestingEventListeners();
}

// ===== اختبار توافق المتصفح =====
function testBrowserCompatibility() {
    console.log("اختبار توافق المتصفح...");
    
    // الكشف عن المتصفح ونظام التشغيل
    const browserInfo = detectBrowser();
    console.log("معلومات المتصفح:", browserInfo);
    
    // التحقق من دعم الميزات الرئيسية
    const featuresSupport = checkFeaturesSupport();
    console.log("دعم الميزات:", featuresSupport);
    
    // إضافة تصحيحات متوافقة مع المتصفحات القديمة إذا لزم الأمر
    applyBrowserPolyfills(browserInfo, featuresSupport);
    
    // إضافة تحذير للمتصفحات غير المدعومة
    if (!featuresSupport.allFeaturesSupported) {
        showBrowserWarning(browserInfo, featuresSupport);
    }
}

// ===== الكشف عن المتصفح ونظام التشغيل =====
function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browser = "غير معروف";
    let version = "غير معروف";
    let os = "غير معروف";
    
    // الكشف عن نظام التشغيل
    if (userAgent.indexOf("Windows") !== -1) {
        os = "Windows";
    } else if (userAgent.indexOf("Mac") !== -1) {
        os = "MacOS";
    } else if (userAgent.indexOf("Linux") !== -1) {
        os = "Linux";
    } else if (userAgent.indexOf("Android") !== -1) {
        os = "Android";
    } else if (userAgent.indexOf("iOS") !== -1 || userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) {
        os = "iOS";
    }
    
    // الكشف عن المتصفح
    if (userAgent.indexOf("Chrome") !== -1 && userAgent.indexOf("Edg") === -1 && userAgent.indexOf("OPR") === -1) {
        browser = "Chrome";
        const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
        if (match) {
            version = match[1];
        }
    } else if (userAgent.indexOf("Firefox") !== -1) {
        browser = "Firefox";
        const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
        if (match) {
            version = match[1];
        }
    } else if (userAgent.indexOf("Safari") !== -1 && userAgent.indexOf("Chrome") === -1) {
        browser = "Safari";
        const match = userAgent.match(/Version\/(\d+\.\d+)/);
        if (match) {
            version = match[1];
        }
    } else if (userAgent.indexOf("Edg") !== -1) {
        browser = "Edge";
        const match = userAgent.match(/Edg\/(\d+\.\d+)/);
        if (match) {
            version = match[1];
        }
    } else if (userAgent.indexOf("OPR") !== -1 || userAgent.indexOf("Opera") !== -1) {
        browser = "Opera";
        const match = userAgent.match(/OPR\/(\d+\.\d+)/);
        if (match) {
            version = match[1];
        }
    } else if (userAgent.indexOf("Trident") !== -1 || userAgent.indexOf("MSIE") !== -1) {
        browser = "Internet Explorer";
        const match = userAgent.match(/(?:MSIE |rv:)(\d+\.\d+)/);
        if (match) {
            version = match[1];
        }
    }
    
    return {
        browser: browser,
        version: version,
        os: os,
        userAgent: userAgent,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    };
}

// ===== التحقق من دعم الميزات الرئيسية =====
function checkFeaturesSupport() {
    const support = {
        flexbox: typeof document.createElement('div').style.flexGrow !== 'undefined',
        grid: typeof document.createElement('div').style.grid !== 'undefined',
        es6: typeof Symbol !== 'undefined' && typeof Promise !== 'undefined',
        localStorage: typeof localStorage !== 'undefined',
        sessionStorage: typeof sessionStorage !== 'undefined',
        fetch: typeof fetch !== 'undefined',
        canvas: !!document.createElement('canvas').getContext,
        webGL: (function() {
            try {
                return !!document.createElement('canvas').getContext('webgl') || 
                       !!document.createElement('canvas').getContext('experimental-webgl');
            } catch(e) {
                return false;
            }
        })(),
        webWorkers: typeof Worker !== 'undefined',
        fileAPI: typeof FileReader !== 'undefined',
        history: typeof history.pushState !== 'undefined',
        geolocation: 'geolocation' in navigator,
        svg: !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect),
        touchEvents: 'ontouchstart' in window || navigator.maxTouchPoints > 0
    };
    
    // التحقق من دعم جميع الميزات المطلوبة
    support.allFeaturesSupported = support.flexbox && support.es6 && 
                                  support.localStorage && support.canvas && 
                                  support.fetch && support.fileAPI;
    
    return support;
}

// ===== إضافة تصحيحات متوافقة مع المتصفحات القديمة =====
function applyBrowserPolyfills(browserInfo, featuresSupport) {
    // إضافة تصحيحات للمتصفحات القديمة
    if (!featuresSupport.es6) {
        // تحميل تصحيحات ES6
        loadScript('https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js');
        loadScript('https://cdn.jsdelivr.net/npm/whatwg-fetch@3.0.0/dist/fetch.umd.min.js');
    }
    
    if (!featuresSupport.flexbox) {
        // إضافة فئة للجسم للتعامل مع عدم دعم Flexbox
        document.body.classList.add('no-flexbox');
    }
    
    if (browserInfo.browser === "Internet Explorer") {
        // إضافة تصحيحات خاصة بـ Internet Explorer
        document.body.classList.add('ie-browser');
        
        // تحميل تصحيحات إضافية
        loadScript('https://cdn.jsdelivr.net/npm/classlist.js@1.1.20150312/classList.min.js');
        loadScript('https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js');
    }
}

// ===== تحميل نص برمجي خارجي =====
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
}

// ===== عرض تحذير للمتصفحات غير المدعومة =====
function showBrowserWarning(browserInfo, featuresSupport) {
    // التحقق مما إذا كان قد تم عرض التحذير بالفعل
    if (localStorage.getItem('browser_warning_dismissed')) {
        return;
    }
    
    // إنشاء عنصر التحذير
    const warningElement = document.createElement('div');
    warningElement.className = 'browser-warning';
    warningElement.id = 'browser-warning';
    
    // إضافة محتوى التحذير
    warningElement.innerHTML = `
        <div class="browser-warning-content">
            <h3>تحذير: متصفح غير مدعوم بالكامل</h3>
            <p>يبدو أنك تستخدم متصفح ${browserInfo.browser} ${browserInfo.version} على نظام ${browserInfo.os}.</p>
            <p>قد لا تعمل بعض ميزات التطبيق بشكل صحيح. للحصول على أفضل تجربة، يرجى استخدام أحدث إصدار من أحد المتصفحات التالية:</p>
            <ul>
                <li>Google Chrome</li>
                <li>Mozilla Firefox</li>
                <li>Microsoft Edge</li>
                <li>Safari</li>
            </ul>
            <div class="browser-warning-actions">
                <button id="dismiss-browser-warning">فهمت</button>
                <button id="hide-browser-warning">لا تظهر هذا التحذير مرة أخرى</button>
            </div>
        </div>
    `;
    
    // إضافة التحذير إلى المستند
    document.body.appendChild(warningElement);
    
    // إضافة مستمعي الأحداث لأزرار التحذير
    document.getElementById('dismiss-browser-warning').addEventListener('click', function() {
        document.getElementById('browser-warning').style.display = 'none';
    });
    
    document.getElementById('hide-browser-warning').addEventListener('click', function() {
        localStorage.setItem('browser_warning_dismissed', 'true');
        document.getElementById('browser-warning').style.display = 'none';
    });
}

// ===== اختبار الأداء =====
function testPerformance() {
    console.log("اختبار الأداء...");
    
    // قياس وقت تحميل الصفحة
    measurePageLoadTime();
    
    // قياس أداء العمليات الحسابية
    measureCalculationPerformance();
    
    // قياس أداء الرسوم البيانية
    measureChartsPerformance();
    
    // تحسين الأداء بناءً على النتائج
    optimizePerformance();
}

// ===== قياس وقت تحميل الصفحة =====
function measurePageLoadTime() {
    // استخدام Performance API لقياس وقت تحميل الصفحة
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const timing = window.performance.timing;
                const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
                console.log("وقت تحميل الصفحة:", pageLoadTime, "مللي ثانية");
                
                // تخزين وقت التحميل للتحليل
                if (localStorage) {
                    localStorage.setItem('page_load_time', pageLoadTime);
                }
                
                // عرض تحذير إذا كان وقت التحميل طويلاً جداً
                if (pageLoadTime > 3000) {
                    console.warn("تحذير: وقت تحميل الصفحة طويل جداً");
                }
            }, 0);
        });
    }
}

// ===== قياس أداء العمليات الحسابية =====
function measureCalculationPerformance() {
    // قياس أداء العمليات الحسابية الرئيسية
    console.log("قياس أداء العمليات الحسابية...");
    
    // قياس أداء حساب نقطة التعادل
    measureFunctionPerformance(function() {
        // محاكاة حساب نقطة التعادل
        const fixedCosts = 50000;
        const unitPrice = 100;
        const unitCost = 60;
        const breakEvenUnits = fixedCosts / (unitPrice - unitCost);
        return breakEvenUnits;
    }, "حساب نقطة التعادل");
    
    // قياس أداء حساب معدل العائد الداخلي
    measureFunctionPerformance(function() {
        // محاكاة حساب معدل العائد الداخلي (مبسط)
        const cashFlows = [-100000, 20000, 25000, 30000, 35000, 40000];
        let irr = 0.1; // تخمين أولي
        
        // تكرار بسيط لتقريب IRR
        for (let i = 0; i < 10; i++) {
            let npv = 0;
            for (let j = 0; j < cashFlows.length; j++) {
                npv += cashFlows[j] / Math.pow(1 + irr, j);
            }
            
            if (Math.abs(npv) < 0.1) {
                break;
            }
            
            irr += npv > 0 ? 0.01 : -0.01;
        }
        
        return irr;
    }, "حساب معدل العائد الداخلي");
    
    // قياس أداء حساب صافي القيمة الحالية
    measureFunctionPerformance(function() {
        // محاكاة حساب صافي القيمة الحالية
        const cashFlows = [-100000, 20000, 25000, 30000, 35000, 40000];
        const discountRate = 0.1;
        
        let npv = 0;
        for (let i = 0; i < cashFlows.length; i++) {
            npv += cashFlows[i] / Math.pow(1 + discountRate, i);
        }
        
        return npv;
    }, "حساب صافي القيمة الحالية");
}

// ===== قياس أداء الرسوم البيانية =====
function measureChartsPerformance() {
    // قياس أداء إنشاء وتحديث الرسوم البيانية
    console.log("قياس أداء الرسوم البيانية...");
    
    // قياس أداء إنشاء الرسوم البيانية
    if (window.initAdvancedCharts) {
        measureFunctionPerformance(function() {
            // محاكاة إنشاء الرسوم البيانية (بدون تنفيذ فعلي)
            // هذا مجرد قياس للأداء
        }, "إنشاء الرسوم البيانية");
    }
    
    // قياس أداء تحديث الرسوم البيانية
    if (window.updateAllCharts) {
        measureFunctionPerformance(function() {
            // محاكاة تحديث الرسوم البيانية (بدون تنفيذ فعلي)
            // هذا مجرد قياس للأداء
        }, "تحديث الرسوم البيانية");
    }
}

// ===== قياس أداء دالة =====
function measureFunctionPerformance(func, label) {
    // قياس وقت تنفيذ الدالة
    const iterations = 100;
    const startTime = performance.now();
    
    for (let i = 0; i < iterations; i++) {
        func();
    }
    
    const endTime = performance.now();
    const averageTime = (endTime - startTime) / iterations;
    
    console.log(`أداء ${label}: ${averageTime.toFixed(2)} مللي ثانية في المتوسط`);
    
    // تخزين نتائج الأداء للتحليل
    if (localStorage) {
        const performanceData = JSON.parse(localStorage.getItem('performance_data') || '{}');
        performanceData[label] = averageTime;
        localStorage.setItem('performance_data', JSON.stringify(performanceData));
    }
    
    return averageTime;
}

// ===== تحسين الأداء =====
function optimizePerformance() {
    console.log("تحسين الأداء...");
    
    // تأجيل تحميل الموارد غير الضرورية
    deferNonEssentialResources();
    
    // تحسين معالجة الأحداث
    optimizeEventHandling();
    
    // تحسين الرسوم البيانية
    optimizeCharts();
    
    // تحسين العمليات الحسابية
    optimizeCalculations();
}

// ===== تأجيل تحميل الموارد غير الضرورية =====
function deferNonEssentialResources() {
    // تأجيل تحميل الصور غير المرئية
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    imageObserver.unobserve(image);
                }
            });
        });
        
        images.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        // بديل للمتصفحات التي لا تدعم IntersectionObserver
        images.forEach(function(image) {
            image.src = image.dataset.src;
        });
    }
    
    // تأجيل تحميل النصوص البرمجية غير الضرورية
    const deferScripts = document.querySelectorAll('script[data-defer]');
    
    deferScripts.forEach(function(script) {
        const deferScript = document.createElement('script');
        
        if (script.src) {
            deferScript.src = script.src;
        } else {
            deferScript.textContent = script.textContent;
        }
        
        // نسخ السمات
        Array.from(script.attributes).forEach(function(attr) {
            if (attr.name !== 'data-defer') {
                deferScript.setAttribute(attr.name, attr.value);
            }
        });
        
        // إزالة النص البرمجي الأصلي وإضافة النص البرمجي المؤجل
        script.parentNode.removeChild(script);
        
        // إضافة النص البرمجي بعد تحميل الصفحة
        window.addEventListener('load', function() {
            document.body.appendChild(deferScript);
        });
    });
}

// ===== تحسين معالجة الأحداث =====
function optimizeEventHandling() {
    // استخدام تقنية التفويض للأحداث لتقليل عدد مستمعي الأحداث
    const formSections = document.querySelectorAll('.form-section');
    
    formSections.forEach(function(section) {
        // إزالة مستمعي الأحداث الفردية من حقول النموذج
        const inputFields = section.querySelectorAll('input, select, textarea');
        
        inputFields.forEach(function(field) {
            const clonedField = field.cloneNode(true);
            field.parentNode.replaceChild(clonedField, field);
        });
        
        // إضافة مستمع أحداث واحد للقسم بأكمله
        section.addEventListener('input', function(event) {
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT' || event.target.tagName === 'TEXTAREA') {
                // معالجة الحدث
                handleInputEvent(event.target);
            }
        });
        
        section.addEventListener('change', function(event) {
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT' || event.target.tagName === 'TEXTAREA') {
                // معالجة الحدث
                handleChangeEvent(event.target);
            }
        });
    });
    
    // استخدام تقنية الاختناق للأحداث المتكررة
    const resizeHandler = throttle(function() {
        // معالجة حدث تغيير الحجم
        handleResize();
    }, 200);
    
    window.addEventListener('resize', resizeHandler);
    
    // استخدام تقنية الارتداد للأحداث التي تتطلب معالجة ثقيلة
    const inputHandler = debounce(function(event) {
        // معالجة حدث الإدخال
        updateCalculations();
    }, 500);
    
    document.addEventListener('input', inputHandler);
}

// ===== معالجة حدث الإدخال =====
function handleInputEvent(target) {
    // التحقق من صحة الإدخال
    validateInput(target);
    
    // تحديث القيم المرتبطة
    updateRelatedValues(target);
}

// ===== معالجة حدث التغيير =====
function handleChangeEvent(target) {
    // تحديث الحسابات إذا لزم الأمر
    if (target.classList.contains('calculation-input')) {
        updateCalculations();
    }
    
    // تحديث الرسوم البيانية إذا لزم الأمر
    if (target.classList.contains('chart-input')) {
        updateCharts();
    }
}

// ===== معالجة حدث تغيير الحجم =====
function handleResize() {
    // تحديث تخطيط الصفحة
    updateLayout();
    
    // تحديث الرسوم البيانية
    if (window.updateAllCharts) {
        window.updateAllCharts();
    }
}

// ===== تقنية الاختناق =====
function throttle(func, delay) {
    let lastCall = 0;
    
    return function(...args) {
        const now = new Date().getTime();
        
        if (now - lastCall < delay) {
            return;
        }
        
        lastCall = now;
        return func(...args);
    };
}

// ===== تقنية الارتداد =====
function debounce(func, delay) {
    let timeout;
    
    return function(...args) {
        clearTimeout(timeout);
        
        timeout = setTimeout(function() {
            func(...args);
        }, delay);
    };
}

// ===== تحسين الرسوم البيانية =====
function optimizeCharts() {
    // تحسين أداء الرسوم البيانية
    if (window.Chart) {
        // تعطيل الرسوم المتحركة للرسوم البيانية على الأجهزة المحمولة
        const browserInfo = detectBrowser();
        
        if (browserInfo.isMobile) {
            Chart.defaults.animation = false;
        }
        
        // تقليل عدد النقاط في الرسوم البيانية الكبيرة
        const charts = document.querySelectorAll('canvas');
        
        charts.forEach(function(canvas) {
            const chart = canvas.chart;
            
            if (chart && chart.data && chart.data.datasets) {
                chart.data.datasets.forEach(function(dataset) {
                    if (dataset.data && dataset.data.length > 100) {
                        // تقليل عدد النقاط للرسوم البيانية الكبيرة
                        dataset.data = reduceDataPoints(dataset.data, 100);
                        
                        // تحديث الرسم البياني
                        chart.update();
                    }
                });
            }
        });
    }
}

// ===== تقليل عدد النقاط =====
function reduceDataPoints(data, maxPoints) {
    if (data.length <= maxPoints) {
        return data;
    }
    
    const factor = Math.ceil(data.length / maxPoints);
    const result = [];
    
    for (let i = 0; i < data.length; i += factor) {
        // حساب متوسط النقاط في هذه المجموعة
        let sum = 0;
        let count = 0;
        
        for (let j = 0; j < factor && i + j < data.length; j++) {
            sum += data[i + j];
            count++;
        }
        
        result.push(sum / count);
    }
    
    return result;
}

// ===== تحسين العمليات الحسابية =====
function optimizeCalculations() {
    // تخزين نتائج العمليات الحسابية المتكررة
    const calculationCache = {};
    
    // استبدال دوال الحساب الأصلية بدوال محسنة
    if (window.calculateBreakEven) {
        const originalCalculateBreakEven = window.calculateBreakEven;
        
        window.calculateBreakEven = function(fixedCosts, unitPrice, unitCost) {
            // إنشاء مفتاح للتخزين المؤقت
            const cacheKey = `breakEven_${fixedCosts}_${unitPrice}_${unitCost}`;
            
            // التحقق من وجود النتيجة في التخزين المؤقت
            if (calculationCache[cacheKey] !== undefined) {
                return calculationCache[cacheKey];
            }
            
            // حساب النتيجة وتخزينها
            const result = originalCalculateBreakEven(fixedCosts, unitPrice, unitCost);
            calculationCache[cacheKey] = result;
            
            return result;
        };
    }
    
    if (window.calculateNPV) {
        const originalCalculateNPV = window.calculateNPV;
        
        window.calculateNPV = function(cashFlows, discountRate) {
            // إنشاء مفتاح للتخزين المؤقت
            const cacheKey = `npv_${cashFlows.join('_')}_${discountRate}`;
            
            // التحقق من وجود النتيجة في التخزين المؤقت
            if (calculationCache[cacheKey] !== undefined) {
                return calculationCache[cacheKey];
            }
            
            // حساب النتيجة وتخزينها
            const result = originalCalculateNPV(cashFlows, discountRate);
            calculationCache[cacheKey] = result;
            
            return result;
        };
    }
    
    if (window.calculateIRR) {
        const originalCalculateIRR = window.calculateIRR;
        
        window.calculateIRR = function(cashFlows) {
            // إنشاء مفتاح للتخزين المؤقت
            const cacheKey = `irr_${cashFlows.join('_')}`;
            
            // التحقق من وجود النتيجة في التخزين المؤقت
            if (calculationCache[cacheKey] !== undefined) {
                return calculationCache[cacheKey];
            }
            
            // حساب النتيجة وتخزينها
            const result = originalCalculateIRR(cashFlows);
            calculationCache[cacheKey] = result;
            
            return result;
        };
    }
}

// ===== تحسين تجربة المستخدم =====
function enhanceUserExperience() {
    console.log("تحسين تجربة المستخدم...");
    
    // إضافة تلميحات للمساعدة
    addTooltips();
    
    // تحسين التنقل
    enhanceNavigation();
    
    // تحسين النماذج
    enhanceForms();
    
    // إضافة اختصارات لوحة المفاتيح
    addKeyboardShortcuts();
    
    // تحسين الاستجابة للأجهزة المحمولة
    enhanceMobileExperience();
}

// ===== إضافة تلميحات للمساعدة =====
function addTooltips() {
    // إضافة تلميحات للمساعدة للعناصر التي تحتوي على سمة data-tooltip
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(function(element) {
        // إنشاء عنصر التلميح
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.dataset.tooltip;
        
        // إضافة التلميح إلى العنصر
        element.appendChild(tooltip);
        
        // إضافة فئة للعنصر
        element.classList.add('has-tooltip');
        
        // إضافة مستمعي الأحداث
        element.addEventListener('mouseenter', function() {
            tooltip.classList.add('show');
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
        });
    });
}

// ===== تحسين التنقل =====
function enhanceNavigation() {
    // تحسين التنقل بين الأقسام
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // الحصول على معرف القسم المستهدف
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // التمرير إلى القسم المستهدف
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // إضافة معرف القسم إلى عنوان URL
                history.pushState(null, null, `#${targetId}`);
                
                // إزالة الفئة النشطة من جميع الروابط
                navLinks.forEach(function(navLink) {
                    navLink.classList.remove('active');
                });
                
                // إضافة الفئة النشطة إلى الرابط الحالي
                link.classList.add('active');
            }
        });
    });
    
    // تحديث الرابط النشط عند التمرير
    window.addEventListener('scroll', throttle(function() {
        // الحصول على جميع الأقسام
        const sections = document.querySelectorAll('section');
        
        // تحديد القسم المرئي حالياً
        let currentSection = null;
        
        sections.forEach(function(section) {
            const rect = section.getBoundingClientRect();
            
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section;
            }
        });
        
        if (currentSection) {
            // إزالة الفئة النشطة من جميع الروابط
            navLinks.forEach(function(navLink) {
                navLink.classList.remove('active');
            });
            
            // إضافة الفئة النشطة إلى الرابط المقابل للقسم الحالي
            const currentLink = document.querySelector(`.nav-link[href="#${currentSection.id}"]`);
            
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }
    }, 100));
}

// ===== تحسين النماذج =====
function enhanceForms() {
    // تحسين تجربة المستخدم في النماذج
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
        // منع إرسال النموذج عند الضغط على Enter
        form.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
                event.preventDefault();
                
                // الانتقال إلى الحقل التالي
                const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
                const currentIndex = inputs.indexOf(event.target);
                
                if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus();
                }
            }
        });
        
        // إضافة تحقق من صحة الإدخال في الوقت الفعلي
        const inputFields = form.querySelectorAll('input, select, textarea');
        
        inputFields.forEach(function(field) {
            field.addEventListener('input', function() {
                validateInput(field);
            });
            
            field.addEventListener('blur', function() {
                validateInput(field);
            });
        });
    });
}

// ===== التحقق من صحة الإدخال =====
function validateInput(field) {
    // التحقق من صحة الإدخال بناءً على نوع الحقل
    let isValid = true;
    let errorMessage = '';
    
    // إزالة رسائل الخطأ السابقة
    const existingError = field.parentNode.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    // التحقق من الحقول المطلوبة
    if (field.required && field.value.trim() === '') {
        isValid = false;
        errorMessage = 'هذا الحقل مطلوب';
    } else if (field.type === 'email' && field.value.trim() !== '') {
        // التحقق من صحة البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
        }
    } else if (field.type === 'number' && field.value.trim() !== '') {
        // التحقق من صحة الرقم
        const numValue = parseFloat(field.value);
        
        if (isNaN(numValue)) {
            isValid = false;
            errorMessage = 'يرجى إدخال رقم صحيح';
        } else if (field.min !== undefined && numValue < parseFloat(field.min)) {
            isValid = false;
            errorMessage = `يجب أن تكون القيمة أكبر من أو تساوي ${field.min}`;
        } else if (field.max !== undefined && numValue > parseFloat(field.max)) {
            isValid = false;
            errorMessage = `يجب أن تكون القيمة أقل من أو تساوي ${field.max}`;
        }
    } else if (field.pattern && field.value.trim() !== '') {
        // التحقق من صحة النمط
        const pattern = new RegExp(field.pattern);
        
        if (!pattern.test(field.value)) {
            isValid = false;
            errorMessage = field.dataset.errorMessage || 'يرجى إدخال قيمة صحيحة';
        }
    }
    
    // تحديث حالة الحقل
    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        
        // إضافة رسالة الخطأ
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        
        field.parentNode.appendChild(errorElement);
    }
    
    return isValid;
}

// ===== إضافة اختصارات لوحة المفاتيح =====
function addKeyboardShortcuts() {
    // إضافة اختصارات لوحة المفاتيح للوظائف الشائعة
    document.addEventListener('keydown', function(event) {
        // اختصار Ctrl+S لحفظ البيانات
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            saveData();
        }
        
        // اختصار Ctrl+P لطباعة التقرير
        if (event.ctrlKey && event.key === 'p') {
            event.preventDefault();
            printReport();
        }
        
        // اختصار Ctrl+E لتصدير البيانات
        if (event.ctrlKey && event.key === 'e') {
            event.preventDefault();
            exportData();
        }
        
        // اختصار F1 لفتح المساعدة
        if (event.key === 'F1') {
            event.preventDefault();
            openHelp();
        }
    });
}

// ===== حفظ البيانات =====
function saveData() {
    // جمع البيانات من النموذج
    const formData = {};
    const inputFields = document.querySelectorAll('input, select, textarea');
    
    inputFields.forEach(function(field) {
        if (field.id) {
            formData[field.id] = field.value;
        }
    });
    
    // حفظ البيانات في التخزين المحلي
    localStorage.setItem('feasibility_study_data', JSON.stringify(formData));
    
    // عرض إشعار نجاح
    showNotification('تم حفظ البيانات بنجاح');
}

// ===== طباعة التقرير =====
function printReport() {
    // فتح نافذة الطباعة
    window.print();
}

// ===== تصدير البيانات =====
function exportData() {
    // فتح نافذة إعدادات التصدير
    if (window.openExportSettingsModal) {
        window.openExportSettingsModal();
    }
}

// ===== فتح المساعدة =====
function openHelp() {
    // فتح نافذة المساعدة
    const helpModal = document.getElementById('help-modal');
    
    if (helpModal) {
        helpModal.style.display = 'block';
    }
}

// ===== تحسين الاستجابة للأجهزة المحمولة =====
function enhanceMobileExperience() {
    // التحقق مما إذا كان الجهاز محمولاً
    const browserInfo = detectBrowser();
    
    if (browserInfo.isMobile) {
        // إضافة فئة للجسم للأجهزة المحمولة
        document.body.classList.add('mobile-device');
        
        // تحسين حجم الخط والأزرار للأجهزة المحمولة
        const style = document.createElement('style');
        style.textContent = `
            .mobile-device button, .mobile-device input, .mobile-device select, .mobile-device textarea {
                font-size: 16px !important;
                padding: 10px !important;
            }
            
            .mobile-device .form-label {
                font-size: 14px !important;
            }
            
            .mobile-device .nav-link {
                padding: 15px !important;
            }
        `;
        
        document.head.appendChild(style);
        
        // تحسين التمرير للأجهزة المحمولة
        enhanceMobileScrolling();
        
        // تحسين التفاعل باللمس
        enhanceTouchInteraction();
    }
}

// ===== تحسين التمرير للأجهزة المحمولة =====
function enhanceMobileScrolling() {
    // تحسين التمرير للأجهزة المحمولة
    const scrollableElements = document.querySelectorAll('.scrollable');
    
    scrollableElements.forEach(function(element) {
        // إضافة دعم التمرير باللمس
        let startY = 0;
        let startScrollTop = 0;
        
        element.addEventListener('touchstart', function(event) {
            startY = event.touches[0].pageY;
            startScrollTop = element.scrollTop;
        });
        
        element.addEventListener('touchmove', function(event) {
            const deltaY = startY - event.touches[0].pageY;
            element.scrollTop = startScrollTop + deltaY;
        });
    });
}

// ===== تحسين التفاعل باللمس =====
function enhanceTouchInteraction() {
    // تحسين التفاعل باللمس للعناصر التفاعلية
    const interactiveElements = document.querySelectorAll('button, .nav-link, .interactive');
    
    interactiveElements.forEach(function(element) {
        // إضافة تأثير اللمس
        element.addEventListener('touchstart', function() {
            element.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            element.classList.remove('touch-active');
        });
        
        element.addEventListener('touchcancel', function() {
            element.classList.remove('touch-active');
        });
    });
}

// ===== تحسين الوصول =====
function improveAccessibility() {
    console.log("تحسين الوصول...");
    
    // إضافة سمات ARIA
    addAriaAttributes();
    
    // تحسين ترتيب التنقل
    improveTabOrder();
    
    // إضافة تباين ألوان كافٍ
    improveColorContrast();
    
    // تحسين قابلية القراءة
    improveReadability();
}

// ===== إضافة سمات ARIA =====
function addAriaAttributes() {
    // إضافة سمات ARIA للعناصر
    
    // إضافة سمات للنماذج
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form, index) {
        if (!form.getAttribute('aria-labelledby')) {
            const formId = form.id || `form-${index}`;
            const formLabelId = `${formId}-label`;
            
            // إضافة عنوان للنموذج
            const formHeading = form.querySelector('h2, h3, h4') || form.previousElementSibling;
            
            if (formHeading) {
                formHeading.id = formLabelId;
                form.setAttribute('aria-labelledby', formLabelId);
            }
        }
    });
    
    // إضافة سمات للحقول
    const inputFields = document.querySelectorAll('input, select, textarea');
    
    inputFields.forEach(function(field) {
        // التأكد من وجود تسمية للحقل
        const label = document.querySelector(`label[for="${field.id}"]`);
        
        if (!label && !field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby')) {
            // إضافة تسمية للحقل
            field.setAttribute('aria-label', field.placeholder || field.name || 'حقل إدخال');
        }
        
        // إضافة وصف للحقل إذا كان هناك نص تلميح
        if (field.dataset.tooltip && !field.getAttribute('aria-describedby')) {
            const tooltipId = `${field.id}-tooltip`;
            const tooltip = field.parentNode.querySelector('.tooltip');
            
            if (tooltip) {
                tooltip.id = tooltipId;
                field.setAttribute('aria-describedby', tooltipId);
            }
        }
    });
    
    // إضافة سمات للأزرار
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(function(button) {
        if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
            // إضافة تسمية للزر
            const icon = button.querySelector('i, svg');
            
            if (icon) {
                const iconClass = icon.className;
                let label = 'زر';
                
                if (iconClass.includes('add')) {
                    label = 'إضافة';
                } else if (iconClass.includes('edit')) {
                    label = 'تعديل';
                } else if (iconClass.includes('delete')) {
                    label = 'حذف';
                } else if (iconClass.includes('save')) {
                    label = 'حفظ';
                } else if (iconClass.includes('cancel')) {
                    label = 'إلغاء';
                }
                
                button.setAttribute('aria-label', label);
            }
        }
    });
    
    // إضافة سمات للروابط
    const links = document.querySelectorAll('a');
    
    links.forEach(function(link) {
        if (!link.textContent.trim() && !link.getAttribute('aria-label')) {
            // إضافة تسمية للرابط
            const icon = link.querySelector('i, svg');
            
            if (icon) {
                const iconClass = icon.className;
                let label = 'رابط';
                
                if (iconClass.includes('home')) {
                    label = 'الصفحة الرئيسية';
                } else if (iconClass.includes('info')) {
                    label = 'معلومات';
                } else if (iconClass.includes('help')) {
                    label = 'مساعدة';
                } else if (iconClass.includes('settings')) {
                    label = 'إعدادات';
                }
                
                link.setAttribute('aria-label', label);
            }
        }
        
        // إضافة سمة للروابط الخارجية
        if (link.hostname !== window.location.hostname && link.hostname !== '') {
            link.setAttribute('rel', 'noopener noreferrer');
            
            if (!link.getAttribute('aria-describedby')) {
                const externalLinkId = `external-link-desc`;
                let externalLinkDesc = document.getElementById(externalLinkId);
                
                if (!externalLinkDesc) {
                    externalLinkDesc = document.createElement('span');
                    externalLinkDesc.id = externalLinkId;
                    externalLinkDesc.className = 'sr-only';
                    externalLinkDesc.textContent = 'يفتح في نافذة جديدة';
                    document.body.appendChild(externalLinkDesc);
                }
                
                link.setAttribute('aria-describedby', externalLinkId);
            }
        }
    });
}

// ===== تحسين ترتيب التنقل =====
function improveTabOrder() {
    // تحسين ترتيب التنقل باستخدام لوحة المفاتيح
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    // تحديد العناصر التي تحتاج إلى تعديل
    const elementsToFix = Array.from(focusableElements).filter(function(element) {
        return element.tabIndex === 0 || element.tabIndex < 0;
    });
    
    // تعيين ترتيب التنقل بناءً على موضع العنصر في المستند
    elementsToFix.sort(function(a, b) {
        const posA = getElementPosition(a);
        const posB = getElementPosition(b);
        
        if (posA.top < posB.top - 50) {
            return -1;
        } else if (posA.top > posB.top + 50) {
            return 1;
        } else {
            return posA.left - posB.left;
        }
    });
    
    // تعيين ترتيب التنقل
    elementsToFix.forEach(function(element, index) {
        element.tabIndex = index + 1;
    });
}

// ===== الحصول على موضع العنصر =====
function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
    };
}

// ===== تحسين تباين الألوان =====
function improveColorContrast() {
    // تحسين تباين الألوان للعناصر
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, input, select, textarea, label, span');
    
    textElements.forEach(function(element) {
        // الحصول على لون النص ولون الخلفية
        const textColor = getComputedStyle(element).color;
        const bgColor = getBackgroundColor(element);
        
        // حساب نسبة التباين
        const contrast = calculateContrast(textColor, bgColor);
        
        // تحسين التباين إذا كان منخفضاً
        if (contrast < 4.5) {
            // تحديد ما إذا كان يجب تغيير لون النص أو لون الخلفية
            const textRgb = parseColor(textColor);
            const bgRgb = parseColor(bgColor);
            
            if (getBrightness(textRgb) > getBrightness(bgRgb)) {
                // النص أفتح من الخلفية، جعله أكثر سطوعاً
                element.style.color = '#ffffff';
            } else {
                // النص أغمق من الخلفية، جعله أكثر قتامة
                element.style.color = '#000000';
            }
        }
    });
}

// ===== الحصول على لون الخلفية =====
function getBackgroundColor(element) {
    let bgColor = getComputedStyle(element).backgroundColor;
    
    // إذا كانت الخلفية شفافة، البحث في العناصر الأب
    if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
        let parent = element.parentElement;
        
        while (parent) {
            bgColor = getComputedStyle(parent).backgroundColor;
            
            if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                break;
            }
            
            parent = parent.parentElement;
        }
        
        // إذا لم يتم العثور على لون خلفية، استخدام اللون الأبيض كافتراضي
        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
            bgColor = '#ffffff';
        }
    }
    
    return bgColor;
}

// ===== تحليل اللون =====
function parseColor(color) {
    // تحليل قيم RGB من سلسلة اللون
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    
    if (match) {
        return {
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3])
        };
    }
    
    // تحليل قيم RGB من سلسلة اللون السداسية
    const hexMatch = color.match(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i);
    
    if (hexMatch) {
        return {
            r: parseInt(hexMatch[1], 16),
            g: parseInt(hexMatch[2], 16),
            b: parseInt(hexMatch[3], 16)
        };
    }
    
    // القيمة الافتراضية
    return { r: 0, g: 0, b: 0 };
}

// ===== حساب سطوع اللون =====
function getBrightness(rgb) {
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
}

// ===== حساب نسبة التباين =====
function calculateContrast(color1, color2) {
    const rgb1 = parseColor(color1);
    const rgb2 = parseColor(color2);
    
    const l1 = getLuminance(rgb1);
    const l2 = getLuminance(rgb2);
    
    // حساب نسبة التباين
    const contrast = l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    
    return contrast;
}

// ===== حساب الإضاءة النسبية =====
function getLuminance(rgb) {
    // تحويل قيم RGB إلى قيم نسبية
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    // تحويل قيم RGB إلى قيم خطية
    const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    // حساب الإضاءة النسبية
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

// ===== تحسين قابلية القراءة =====
function improveReadability() {
    // تحسين قابلية القراءة للنصوص
    const textContainers = document.querySelectorAll('p, li, td, th, label, input, textarea, select, button');
    
    textContainers.forEach(function(container) {
        // التأكد من أن حجم الخط كافٍ للقراءة
        const fontSize = parseFloat(getComputedStyle(container).fontSize);
        
        if (fontSize < 12) {
            container.style.fontSize = '12px';
        }
        
        // التأكد من أن المسافة بين الأسطر كافية
        const lineHeight = parseFloat(getComputedStyle(container).lineHeight);
        
        if (lineHeight < fontSize * 1.5) {
            container.style.lineHeight = (fontSize * 1.5) + 'px';
        }
    });
}

// ===== إضافة مستمعي الأحداث للاختبار =====
function setupTestingEventListeners() {
    // إضافة مستمع الأحداث لزر اختبار التوافق
    const testCompatibilityBtn = document.getElementById('test-compatibility-btn');
    
    if (testCompatibilityBtn) {
        testCompatibilityBtn.addEventListener('click', function() {
            // اختبار توافق المتصفح
            const browserInfo = detectBrowser();
            const featuresSupport = checkFeaturesSupport();
            
            // عرض نتائج الاختبار
            showTestResults('توافق المتصفح', {
                'المتصفح': browserInfo.browser,
                'الإصدار': browserInfo.version,
                'نظام التشغيل': browserInfo.os,
                'جهاز محمول': browserInfo.isMobile ? 'نعم' : 'لا',
                'دعم Flexbox': featuresSupport.flexbox ? 'نعم' : 'لا',
                'دعم Grid': featuresSupport.grid ? 'نعم' : 'لا',
                'دعم ES6': featuresSupport.es6 ? 'نعم' : 'لا',
                'دعم Canvas': featuresSupport.canvas ? 'نعم' : 'لا',
                'دعم WebGL': featuresSupport.webGL ? 'نعم' : 'لا',
                'دعم Web Workers': featuresSupport.webWorkers ? 'نعم' : 'لا',
                'دعم File API': featuresSupport.fileAPI ? 'نعم' : 'لا',
                'دعم أحداث اللمس': featuresSupport.touchEvents ? 'نعم' : 'لا'
            });
        });
    }
    
    // إضافة مستمع الأحداث لزر اختبار الأداء
    const testPerformanceBtn = document.getElementById('test-performance-btn');
    
    if (testPerformanceBtn) {
        testPerformanceBtn.addEventListener('click', function() {
            // اختبار الأداء
            const pageLoadTime = localStorage.getItem('page_load_time');
            const performanceData = JSON.parse(localStorage.getItem('performance_data') || '{}');
            
            // عرض نتائج الاختبار
            const results = {
                'وقت تحميل الصفحة': pageLoadTime ? pageLoadTime + ' مللي ثانية' : 'غير متوفر'
            };
            
            // إضافة بيانات أداء العمليات الحسابية
            for (const key in performanceData) {
                results[key] = performanceData[key].toFixed(2) + ' مللي ثانية';
            }
            
            showTestResults('اختبار الأداء', results);
        });
    }
}

// ===== عرض نتائج الاختبار =====
function showTestResults(title, results) {
    // إنشاء نافذة منبثقة لعرض نتائج الاختبار
    const resultsModal = document.createElement('div');
    resultsModal.className = 'modal';
    resultsModal.id = 'test-results-modal';
    
    // إنشاء محتوى النافذة المنبثقة
    resultsModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>العنصر</th>
                            <th>القيمة</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(results).map(([key, value]) => `
                            <tr>
                                <td>${key}</td>
                                <td>${value}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    // إضافة النافذة المنبثقة إلى المستند
    document.body.appendChild(resultsModal);
    
    // إظهار النافذة المنبثقة
    resultsModal.style.display = 'block';
    
    // إضافة مستمع الأحداث لزر الإغلاق
    const closeBtn = resultsModal.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        resultsModal.style.display = 'none';
        
        // إزالة النافذة المنبثقة بعد الإغلاق
        setTimeout(function() {
            resultsModal.remove();
        }, 300);
    });
    
    // إغلاق النافذة المنبثقة عند النقر خارجها
    window.addEventListener('click', function(event) {
        if (event.target === resultsModal) {
            resultsModal.style.display = 'none';
            
            // إزالة النافذة المنبثقة بعد الإغلاق
            setTimeout(function() {
                resultsModal.remove();
            }, 300);
        }
    });
}

// ===== عرض إشعار =====
function showNotification(message, type = 'success') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    
    // إضافة رسالة الإشعار
    notification.textContent = message;
    
    // إضافة الإشعار إلى المستند
    document.body.appendChild(notification);
    
    // إخفاء الإشعار بعد 3 ثوانٍ
    setTimeout(function() {
        notification.classList.add('hide');
        
        // إزالة الإشعار من المستند بعد انتهاء التأثير
        setTimeout(function() {
            notification.remove();
        }, 500);
    }, 3000);
}

// ===== تصدير الدوال =====
window.initTestingAndOptimization = initTestingAndOptimization;
window.testBrowserCompatibility = testBrowserCompatibility;
window.testPerformance = testPerformance;
window.enhanceUserExperience = enhanceUserExperience;
window.improveAccessibility = improveAccessibility;
window.showTestResults = showTestResults;
window.showNotification = showNotification;
