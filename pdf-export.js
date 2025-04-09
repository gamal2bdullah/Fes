// إصلاح وظيفة تصدير PDF
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة وظائف تصدير PDF
    initPDFExport();
});

// ===== تهيئة وظائف تصدير PDF =====
function initPDFExport() {
    console.log("تهيئة وظائف تصدير PDF المحسنة...");
    
    // إضافة مستمع الأحداث لزر تصدير PDF
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', function() {
            // فتح نافذة إعدادات التصدير
            openExportSettingsModal();
        });
    }
    
    // إضافة مستمع الأحداث لزر إغلاق نافذة إعدادات التصدير
    const closeExportSettingsBtn = document.getElementById('close-export-settings');
    
    if (closeExportSettingsBtn) {
        closeExportSettingsBtn.addEventListener('click', function() {
            // إغلاق نافذة إعدادات التصدير
            closeExportSettingsModal();
        });
    }
    
    // إضافة مستمع الأحداث لزر تأكيد التصدير
    const confirmExportBtn = document.getElementById('confirm-export-btn');
    
    if (confirmExportBtn) {
        confirmExportBtn.addEventListener('click', function() {
            // جمع إعدادات التصدير
            const exportSettings = collectExportSettings();
            
            // تصدير PDF بالإعدادات المحددة
            exportToPDF(exportSettings);
            
            // إغلاق نافذة إعدادات التصدير
            closeExportSettingsModal();
        });
    }
}

// ===== فتح نافذة إعدادات التصدير =====
function openExportSettingsModal() {
    const exportSettingsModal = document.getElementById('export-settings-modal');
    
    if (exportSettingsModal) {
        exportSettingsModal.style.display = 'block';
    }
}

// ===== إغلاق نافذة إعدادات التصدير =====
function closeExportSettingsModal() {
    const exportSettingsModal = document.getElementById('export-settings-modal');
    
    if (exportSettingsModal) {
        exportSettingsModal.style.display = 'none';
    }
}

// ===== جمع إعدادات التصدير =====
function collectExportSettings() {
    return {
        // إعدادات عامة
        title: document.getElementById('export-title').value || 'دراسة الجدوى',
        author: document.getElementById('export-author').value || 'المستخدم',
        
        // إعدادات الصفحة
        pageSize: document.getElementById('page-size').value || 'a4',
        orientation: document.getElementById('page-orientation').value || 'portrait',
        margins: {
            top: parseInt(document.getElementById('margin-top').value || 10),
            right: parseInt(document.getElementById('margin-right').value || 10),
            bottom: parseInt(document.getElementById('margin-bottom').value || 10),
            left: parseInt(document.getElementById('margin-left').value || 10)
        },
        
        // إعدادات المحتوى
        includeSections: {
            projectInfo: document.getElementById('include-project-info').checked,
            marketAnalysis: document.getElementById('include-market-analysis').checked,
            financialAnalysis: document.getElementById('include-financial-analysis').checked,
            charts: document.getElementById('include-charts').checked,
            recommendations: document.getElementById('include-recommendations').checked,
            riskAnalysis: document.getElementById('include-risk-analysis').checked
        },
        
        // إعدادات الرسوم البيانية
        chartsSettings: {
            width: parseInt(document.getElementById('chart-width').value || 500),
            height: parseInt(document.getElementById('chart-height').value || 300),
            includeChartTitles: document.getElementById('include-chart-titles').checked,
            includeChartLegends: document.getElementById('include-chart-legends').checked
        },
        
        // إعدادات متقدمة
        compression: document.getElementById('pdf-compression').value || 'medium',
        splitSections: document.getElementById('split-sections').checked,
        addPageNumbers: document.getElementById('add-page-numbers').checked,
        addTableOfContents: document.getElementById('add-table-of-contents').checked,
        addHeaderFooter: document.getElementById('add-header-footer').checked
    };
}

// ===== تصدير PDF بالإعدادات المحددة =====
function exportToPDF(settings) {
    console.log("تصدير PDF بالإعدادات:", settings);
    
    // إظهار مؤشر التحميل
    showLoadingIndicator('جاري إنشاء ملف PDF...');
    
    // تأخير بسيط لإتاحة الوقت لعرض مؤشر التحميل
    setTimeout(function() {
        try {
            // إنشاء كائن jsPDF
            const pdfOptions = {
                orientation: settings.orientation,
                unit: 'mm',
                format: settings.pageSize,
                compress: settings.compression !== 'none',
                precision: 2,
                userUnit: 1.0
            };
            
            const pdf = new jspdf.jsPDF(pdfOptions);
            
            // إعداد معلومات المستند
            pdf.setProperties({
                title: settings.title,
                subject: 'دراسة جدوى',
                author: settings.author,
                keywords: 'دراسة جدوى, تحليل مالي, مشروع',
                creator: 'تطبيق دراسة الجدوى'
            });
            
            // إعداد الخط العربي
            setupArabicFont(pdf);
            
            // إضافة جدول المحتويات إذا تم تحديده
            let currentPage = 1;
            let tocPageCount = 0;
            
            if (settings.addTableOfContents) {
                tocPageCount = addTableOfContents(pdf, settings);
                currentPage += tocPageCount;
            }
            
            // إضافة ترويسة وتذييل إذا تم تحديدهما
            if (settings.addHeaderFooter) {
                addHeaderFooter(pdf, settings);
            }
            
            // إضافة أرقام الصفحات إذا تم تحديدها
            if (settings.addPageNumbers) {
                addPageNumbers(pdf);
            }
            
            // إضافة محتوى المستند
            currentPage = addDocumentContent(pdf, settings, currentPage);
            
            // تحديث جدول المحتويات بأرقام الصفحات النهائية
            if (settings.addTableOfContents) {
                updateTableOfContents(pdf, tocPageCount);
            }
            
            // حفظ ملف PDF
            pdf.save(settings.title + '.pdf');
            
            // إخفاء مؤشر التحميل
            hideLoadingIndicator();
            
            // عرض إشعار نجاح
            showNotification('تم تصدير ملف PDF بنجاح');
        } catch (error) {
            console.error('خطأ في تصدير PDF:', error);
            
            // إخفاء مؤشر التحميل
            hideLoadingIndicator();
            
            // عرض إشعار خطأ
            showNotification('حدث خطأ أثناء تصدير PDF: ' + error.message, 'error');
        }
    }, 100);
}

// ===== إعداد الخط العربي =====
function setupArabicFont(pdf) {
    // إضافة دعم اللغة العربية
    pdf.addFont('/fonts/NotoNaskhArabic-Regular.ttf', 'NotoNaskhArabic', 'normal');
    pdf.addFont('/fonts/NotoNaskhArabic-Bold.ttf', 'NotoNaskhArabic', 'bold');
    
    // تعيين الخط الافتراضي
    pdf.setFont('NotoNaskhArabic');
    pdf.setR2L(true);
}

// ===== إضافة جدول المحتويات =====
function addTableOfContents(pdf, settings) {
    console.log("إضافة جدول المحتويات...");
    
    // إنشاء صفحة جدول المحتويات
    pdf.addPage();
    
    // إضافة عنوان جدول المحتويات
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.setFontSize(18);
    pdf.text('جدول المحتويات', pdf.internal.pageSize.width / 2, 20, { align: 'center' });
    
    // إعداد نمط النص العادي
    pdf.setFont('NotoNaskhArabic', 'normal');
    pdf.setFontSize(12);
    
    // إضافة عناصر جدول المحتويات (سيتم تحديث أرقام الصفحات لاحقاً)
    let y = 40;
    const lineHeight = 10;
    const tocItems = [];
    
    // إضافة عناصر جدول المحتويات بناءً على الأقسام المحددة
    if (settings.includeSections.projectInfo) {
        tocItems.push({ title: 'معلومات المشروع', page: '...' });
        pdf.text('معلومات المشروع', 20, y);
        pdf.text('...', pdf.internal.pageSize.width - 20, y, { align: 'right' });
        y += lineHeight;
    }
    
    if (settings.includeSections.marketAnalysis) {
        tocItems.push({ title: 'تحليل السوق', page: '...' });
        pdf.text('تحليل السوق', 20, y);
        pdf.text('...', pdf.internal.pageSize.width - 20, y, { align: 'right' });
        y += lineHeight;
    }
    
    if (settings.includeSections.financialAnalysis) {
        tocItems.push({ title: 'التحليل المالي', page: '...' });
        pdf.text('التحليل المالي', 20, y);
        pdf.text('...', pdf.internal.pageSize.width - 20, y, { align: 'right' });
        y += lineHeight;
    }
    
    if (settings.includeSections.charts) {
        tocItems.push({ title: 'الرسوم البيانية', page: '...' });
        pdf.text('الرسوم البيانية', 20, y);
        pdf.text('...', pdf.internal.pageSize.width - 20, y, { align: 'right' });
        y += lineHeight;
    }
    
    if (settings.includeSections.recommendations) {
        tocItems.push({ title: 'التوصيات', page: '...' });
        pdf.text('التوصيات', 20, y);
        pdf.text('...', pdf.internal.pageSize.width - 20, y, { align: 'right' });
        y += lineHeight;
    }
    
    if (settings.includeSections.riskAnalysis) {
        tocItems.push({ title: 'تحليل المخاطر', page: '...' });
        pdf.text('تحليل المخاطر', 20, y);
        pdf.text('...', pdf.internal.pageSize.width - 20, y, { align: 'right' });
        y += lineHeight;
    }
    
    // حفظ عناصر جدول المحتويات للتحديث لاحقاً
    pdf.tocItems = tocItems;
    
    // إرجاع عدد صفحات جدول المحتويات
    return 1;
}

// ===== تحديث جدول المحتويات =====
function updateTableOfContents(pdf, tocPageCount) {
    console.log("تحديث جدول المحتويات...");
    
    // التأكد من وجود عناصر جدول المحتويات
    if (!pdf.tocItems || pdf.tocItems.length === 0) {
        return;
    }
    
    // الانتقال إلى صفحة جدول المحتويات
    pdf.setPage(1);
    
    // إعداد نمط النص
    pdf.setFont('NotoNaskhArabic', 'normal');
    pdf.setFontSize(12);
    
    // تحديث أرقام الصفحات
    let y = 40;
    const lineHeight = 10;
    
    pdf.tocItems.forEach(item => {
        // مسح رقم الصفحة القديم
        pdf.setFillColor(255, 255, 255);
        pdf.rect(pdf.internal.pageSize.width - 30, y - 5, 20, 8, 'F');
        
        // إضافة رقم الصفحة الجديد
        pdf.text(item.page.toString(), pdf.internal.pageSize.width - 20, y, { align: 'right' });
        
        y += lineHeight;
    });
}

// ===== إضافة ترويسة وتذييل =====
function addHeaderFooter(pdf, settings) {
    console.log("إضافة ترويسة وتذييل...");
    
    // إضافة دالة لرسم الترويسة والتذييل على كل صفحة
    const totalPages = pdf.internal.getNumberOfPages();
    
    for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        
        // إضافة الترويسة
        pdf.setFont('NotoNaskhArabic', 'bold');
        pdf.setFontSize(10);
        pdf.text(settings.title, pdf.internal.pageSize.width / 2, 10, { align: 'center' });
        
        // إضافة خط أفقي تحت الترويسة
        pdf.setDrawColor(200, 200, 200);
        pdf.line(20, 15, pdf.internal.pageSize.width - 20, 15);
        
        // إضافة التذييل
        pdf.setFont('NotoNaskhArabic', 'normal');
        pdf.setFontSize(8);
        
        // إضافة التاريخ في التذييل
        const today = new Date();
        const dateString = today.toLocaleDateString('ar-SA');
        pdf.text(dateString, 20, pdf.internal.pageSize.height - 10);
        
        // إضافة خط أفقي فوق التذييل
        pdf.line(20, pdf.internal.pageSize.height - 15, pdf.internal.pageSize.width - 20, pdf.internal.pageSize.height - 15);
    }
}

// ===== إضافة أرقام الصفحات =====
function addPageNumbers(pdf) {
    console.log("إضافة أرقام الصفحات...");
    
    // إضافة رقم الصفحة على كل صفحة
    const totalPages = pdf.internal.getNumberOfPages();
    
    for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        
        // إضافة رقم الصفحة
        pdf.setFont('NotoNaskhArabic', 'normal');
        pdf.setFontSize(10);
        pdf.text(i + ' / ' + totalPages, pdf.internal.pageSize.width - 20, pdf.internal.pageSize.height - 10, { align: 'right' });
    }
}

// ===== إضافة محتوى المستند =====
function addDocumentContent(pdf, settings, startPage) {
    console.log("إضافة محتوى المستند...");
    
    let currentPage = startPage;
    
    // إضافة معلومات المشروع
    if (settings.includeSections.projectInfo) {
        currentPage = addProjectInfo(pdf, settings, currentPage);
    }
    
    // إضافة تحليل السوق
    if (settings.includeSections.marketAnalysis) {
        currentPage = addMarketAnalysis(pdf, settings, currentPage);
    }
    
    // إضافة التحليل المالي
    if (settings.includeSections.financialAnalysis) {
        currentPage = addFinancialAnalysis(pdf, settings, currentPage);
    }
    
    // إضافة الرسوم البيانية
    if (settings.includeSections.charts) {
        currentPage = addCharts(pdf, settings, currentPage);
    }
    
    // إضافة التوصيات
    if (settings.includeSections.recommendations) {
        currentPage = addRecommendations(pdf, settings, currentPage);
    }
    
    // إضافة تحليل المخاطر
    if (settings.includeSections.riskAnalysis) {
        currentPage = addRiskAnalysis(pdf, settings, currentPage);
    }
    
    return currentPage;
}

// ===== إضافة معلومات المشروع =====
function addProjectInfo(pdf, settings, currentPage) {
    console.log("إضافة معلومات المشروع...");
    
    // إضافة صفحة جديدة إذا تم تحديد خيار تقسيم الأقسام
    if (settings.splitSections) {
        pdf.addPage();
        currentPage++;
    }
    
    // تحديث رقم الصفحة في جدول المحتويات
    if (settings.addTableOfContents && pdf.tocItems) {
        pdf.tocItems.find(item => item.title === 'معلومات المشروع').page = currentPage;
    }
    
    // إضافة عنوان القسم
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.setFontSize(16);
    pdf.text('معلومات المشروع', pdf.internal.pageSize.width / 2, 30, { align: 'center' });
    
    // إعداد نمط النص العادي
    pdf.setFont('NotoNaskhArabic', 'normal');
    pdf.setFontSize(12);
    
    // جمع معلومات المشروع من النموذج
    const projectName = document.getElementById('project-name').value || 'مشروع جديد';
    const projectDescription = document.getElementById('project-description').value || 'لا يوجد وصف';
    const projectLocation = document.getElementById('project-location').value || 'غير محدد';
    const projectOwner = document.getElementById('project-owner').value || 'غير محدد';
    
    // إضافة معلومات المشروع
    let y = 50;
    const lineHeight = 10;
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('اسم المشروع:', 20, y);
    pdf.setFont('NotoNaskhArabic', 'normal');
    pdf.text(projectName, 80, y);
    y += lineHeight * 2;
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('صاحب المشروع:', 20, y);
    pdf.setFont('NotoNaskhArabic', 'normal');
    pdf.text(projectOwner, 80, y);
    y += lineHeight * 2;
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('موقع المشروع:', 20, y);
    pdf.setFont('NotoNaskhArabic', 'normal');
    pdf.text(projectLocation, 80, y);
    y += lineHeight * 2;
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('وصف المشروع:', 20, y);
    y += lineHeight;
    
    pdf.setFont('NotoNaskhArabic', 'normal');
    
    // تقسيم وصف المشروع إلى أسطر متعددة
    const textLines = pdf.splitTextToSize(projectDescription, pdf.internal.pageSize.width - 40);
    
    // إضافة الأسطر إلى المستند
    textLines.forEach(line => {
        // التحقق مما إذا كان النص سيتجاوز حدود الصفحة
        if (y > pdf.internal.pageSize.height - 20) {
            // إضافة صفحة جديدة
            pdf.addPage();
            currentPage++;
            y = 30;
        }
        
        pdf.text(line, 20, y);
        y += lineHeight;
    });
    
    return currentPage;
}

// ===== إضافة تحليل السوق =====
function addMarketAnalysis(pdf, settings, currentPage) {
    console.log("إضافة تحليل السوق...");
    
    // إضافة صفحة جديدة إذا تم تحديد خيار تقسيم الأقسام
    if (settings.splitSections) {
        pdf.addPage();
        currentPage++;
    } else {
        // التحقق مما إذا كان هناك حاجة لصفحة جديدة
        const lastPage = pdf.internal.getCurrentPageInfo().pageNumber;
        if (lastPage !== currentPage) {
            currentPage = lastPage;
        }
    }
    
    // تحديث رقم الصفحة في جدول المحتويات
    if (settings.addTableOfContents && pdf.tocItems) {
        pdf.tocItems.find(item => item.title === 'تحليل السوق').page = currentPage;
    }
    
    // إضافة عنوان القسم
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.setFontSize(16);
    pdf.text('تحليل السوق', pdf.internal.pageSize.width / 2, 30, { align: 'center' });
    
    // إعداد نمط النص العادي
    pdf.setFont('NotoNaskhArabic', 'normal');
    pdf.setFontSize(12);
    
    // جمع بيانات تحليل السوق من النموذج
    const marketSize = document.getElementById('market-size').value || 'غير محدد';
    const marketGrowth = document.getElementById('market-growth').value || 'غير محدد';
    const targetCustomers = document.getElementById('target-customers').value || 'غير محدد';
    const competitionLevel = document.getElementById('competition-level').value || 'غير محدد';
    
    // إضافة بيانات تحليل السوق
    let y = 50;
    const lineHeight = 10;
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('حجم السوق:', 20, y);
    pdf.setFont('NotoNaskhArabic', 'normal');
    pdf.text(marketSize, 80, y);
    y += lineHeight * 2;
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('معدل نمو السوق:', 20, y);
    pdf.setFont('NotoNaskhArabic', 'normal');
    pdf.text(marketGrowth + '%', 80, y);
    y += lineHeight * 2;
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('العملاء المستهدفون:', 20, y);
    pdf.setFont('NotoNaskhArabic', 'normal');
    
    // تقسيم وصف العملاء المستهدفين إلى أسطر متعددة
    const targetCustomersLines = pdf.splitTextToSize(targetCustomers, pdf.internal.pageSize.width - 100);
    
    // إضافة الأسطر إلى المستند
    targetCustomersLines.forEach(line => {
        // التحقق مما إذا كان النص سيتجاوز حدود الصفحة
        if (y > pdf.internal.pageSize.height - 20) {
            // إضافة صفحة جديدة
            pdf.addPage();
            currentPage++;
            y = 30;
        }
        
        pdf.text(line, 80, y);
        y += lineHeight;
    });
    
    y += lineHeight;
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('مستوى المنافسة:', 20, y);
    pdf.setFont('NotoNaskhArabic', 'normal');
    
    // تحويل مستوى المنافسة إلى وصف
    let competitionDescription = '';
    const competitionValue = parseFloat(competitionLevel);
    
    if (competitionValue <= 1) {
        competitionDescription = 'منخفض جداً';
    } else if (competitionValue <= 2) {
        competitionDescription = 'منخفض';
    } else if (competitionValue <= 3) {
        competitionDescription = 'متوسط';
    } else if (competitionValue <= 4) {
        competitionDescription = 'مرتفع';
    } else {
        competitionDescription = 'مرتفع جداً';
    }
    
    pdf.text(competitionDescription + ' (' + competitionLevel + '/5)', 80, y);
    y += lineHeight * 2;
    
    // إضافة جدول المنافسين
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('المنافسون الرئيسيون:', 20, y);
    y += lineHeight * 1.5;
    
    // إنشاء جدول المنافسين
    const competitors = getCompetitorsData();
    
    if (competitors.length > 0) {
        // رسم رأس الجدول
        pdf.setFillColor(240, 240, 240);
        pdf.rect(20, y - 5, pdf.internal.pageSize.width - 40, 10, 'F');
        
        pdf.setFont('NotoNaskhArabic', 'bold');
        pdf.text('اسم المنافس', 25, y);
        pdf.text('نقاط القوة', 100, y);
        pdf.text('نقاط الضعف', 175, y);
        
        y += lineHeight * 1.5;
        
        // رسم صفوف الجدول
        pdf.setFont('NotoNaskhArabic', 'normal');
        
        competitors.forEach(competitor => {
            // التحقق مما إذا كان الجدول سيتجاوز حدود الصفحة
            if (y > pdf.internal.pageSize.height - 30) {
                // إضافة صفحة جديدة
                pdf.addPage();
                currentPage++;
                y = 30;
                
                // إعادة رسم رأس الجدول
                pdf.setFillColor(240, 240, 240);
                pdf.rect(20, y - 5, pdf.internal.pageSize.width - 40, 10, 'F');
                
                pdf.setFont('NotoNaskhArabic', 'bold');
                pdf.text('اسم المنافس', 25, y);
                pdf.text('نقاط القوة', 100, y);
                pdf.text('نقاط الضعف', 175, y);
                
                y += lineHeight * 1.5;
                pdf.setFont('NotoNaskhArabic', 'normal');
            }
            
            // رسم خط أفقي
            pdf.setDrawColor(200, 200, 200);
            pdf.line(20, y - 5, pdf.internal.pageSize.width - 20, y - 5);
            
            // إضافة بيانات المنافس
            pdf.text(competitor.name, 25, y);
            
            // تقسيم نقاط القوة والضعف إلى أسطر متعددة
            const strengthLines = pdf.splitTextToSize(competitor.strengths, 70);
            const weaknessLines = pdf.splitTextToSize(competitor.weaknesses, 70);
            
            // تحديد عدد الأسطر المطلوبة
            const maxLines = Math.max(strengthLines.length, weaknessLines.length);
            
            // إضافة نقاط القوة
            strengthLines.forEach((line, index) => {
                pdf.text(line, 100, y + index * lineHeight);
            });
            
            // إضافة نقاط الضعف
            weaknessLines.forEach((line, index) => {
                pdf.text(line, 175, y + index * lineHeight);
            });
            
            // تحديث موضع Y للصف التالي
            y += lineHeight * (maxLines + 1);
        });
    } else {
        pdf.text('لا توجد بيانات عن المنافسين', 20, y);
        y += lineHeight;
    }
    
    return currentPage;
}

// ===== الحصول على بيانات المنافسين =====
function getCompetitorsData() {
    // جمع بيانات المنافسين من النموذج
    const competitors = [];
    const competitorElements = document.querySelectorAll('.competitor-item');
    
    competitorElements.forEach(element => {
        const nameElement = element.querySelector('.competitor-name');
        const strengthsElement = element.querySelector('.competitor-strengths');
        const weaknessesElement = element.querySelector('.competitor-weaknesses');
        
        if (nameElement && strengthsElement && weaknessesElement) {
            competitors.push({
                name: nameElement.value || 'غير محدد',
                strengths: strengthsElement.value || 'غير محدد',
                weaknesses: weaknessesElement.value || 'غير محدد'
            });
        }
    });
    
    return competitors;
}

// ===== إضافة التحليل المالي =====
function addFinancialAnalysis(pdf, settings, currentPage) {
    console.log("إضافة التحليل المالي...");
    
    // إضافة صفحة جديدة إذا تم تحديد خيار تقسيم الأقسام
    if (settings.splitSections) {
        pdf.addPage();
        currentPage++;
    } else {
        // التحقق مما إذا كان هناك حاجة لصفحة جديدة
        const lastPage = pdf.internal.getCurrentPageInfo().pageNumber;
        if (lastPage !== currentPage) {
            currentPage = lastPage;
        }
    }
    
    // تحديث رقم الصفحة في جدول المحتويات
    if (settings.addTableOfContents && pdf.tocItems) {
        pdf.tocItems.find(item => item.title === 'التحليل المالي').page = currentPage;
    }
    
    // إضافة عنوان القسم
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.setFontSize(16);
    pdf.text('التحليل المالي', pdf.internal.pageSize.width / 2, 30, { align: 'center' });
    
    // إعداد نمط النص العادي
    pdf.setFont('NotoNaskhArabic', 'normal');
    pdf.setFontSize(12);
    
    // جمع بيانات التحليل المالي من النموذج
    const initialInvestment = document.getElementById('initial-investment').value || '0';
    const fixedCosts = document.getElementById('fixed-costs').value || '0';
    const variableCosts = document.getElementById('variable-costs').value || '0';
    const unitPrice = document.getElementById('unit-price').value || '0';
    const unitCost = document.getElementById('unit-cost').value || '0';
    const breakEvenUnits = document.getElementById('break-even-units').value || '0';
    const roi = document.getElementById('roi').value || '0';
    const irr = document.getElementById('irr').value || '0';
    const npv = document.getElementById('npv').value || '0';
    const paybackPeriod = document.getElementById('payback-period').value || '0';
    
    // إضافة بيانات التحليل المالي
    let y = 50;
    const lineHeight = 10;
    
    // إضافة جدول الاستثمار والتكاليف
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('الاستثمار والتكاليف:', 20, y);
    y += lineHeight * 1.5;
    
    // رسم جدول الاستثمار والتكاليف
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, y - 5, pdf.internal.pageSize.width - 40, 10, 'F');
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('البند', 25, y);
    pdf.text('القيمة', pdf.internal.pageSize.width - 50, y, { align: 'right' });
    
    y += lineHeight * 1.5;
    pdf.setFont('NotoNaskhArabic', 'normal');
    
    // إضافة بيانات الاستثمار والتكاليف
    pdf.text('الاستثمار الأولي', 25, y);
    pdf.text(formatCurrency(initialInvestment), pdf.internal.pageSize.width - 50, y, { align: 'right' });
    
    y += lineHeight;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, y - 5, pdf.internal.pageSize.width - 20, y - 5);
    
    pdf.text('التكاليف الثابتة (سنوياً)', 25, y);
    pdf.text(formatCurrency(fixedCosts), pdf.internal.pageSize.width - 50, y, { align: 'right' });
    
    y += lineHeight;
    pdf.line(20, y - 5, pdf.internal.pageSize.width - 20, y - 5);
    
    pdf.text('التكاليف المتغيرة (سنوياً)', 25, y);
    pdf.text(formatCurrency(variableCosts), pdf.internal.pageSize.width - 50, y, { align: 'right' });
    
    y += lineHeight;
    pdf.line(20, y - 5, pdf.internal.pageSize.width - 20, y - 5);
    
    pdf.text('سعر بيع الوحدة', 25, y);
    pdf.text(formatCurrency(unitPrice), pdf.internal.pageSize.width - 50, y, { align: 'right' });
    
    y += lineHeight;
    pdf.line(20, y - 5, pdf.internal.pageSize.width - 20, y - 5);
    
    pdf.text('تكلفة الوحدة المتغيرة', 25, y);
    pdf.text(formatCurrency(unitCost), pdf.internal.pageSize.width - 50, y, { align: 'right' });
    
    y += lineHeight * 3;
    
    // إضافة جدول المؤشرات المالية
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('المؤشرات المالية:', 20, y);
    y += lineHeight * 1.5;
    
    // رسم جدول المؤشرات المالية
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, y - 5, pdf.internal.pageSize.width - 40, 10, 'F');
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('المؤشر', 25, y);
    pdf.text('القيمة', pdf.internal.pageSize.width - 50, y, { align: 'right' });
    
    y += lineHeight * 1.5;
    pdf.setFont('NotoNaskhArabic', 'normal');
    
    // إضافة بيانات المؤشرات المالية
    pdf.text('نقطة التعادل (عدد الوحدات)', 25, y);
    pdf.text(formatNumber(breakEvenUnits) + ' وحدة', pdf.internal.pageSize.width - 50, y, { align: 'right' });
    
    y += lineHeight;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, y - 5, pdf.internal.pageSize.width - 20, y - 5);
    
    pdf.text('معدل العائد على الاستثمار (ROI)', 25, y);
    pdf.text(formatNumber(roi) + '%', pdf.internal.pageSize.width - 50, y, { align: 'right' });
    
    y += lineHeight;
    pdf.line(20, y - 5, pdf.internal.pageSize.width - 20, y - 5);
    
    pdf.text('معدل العائد الداخلي (IRR)', 25, y);
    pdf.text(formatNumber(irr) + '%', pdf.internal.pageSize.width - 50, y, { align: 'right' });
    
    y += lineHeight;
    pdf.line(20, y - 5, pdf.internal.pageSize.width - 20, y - 5);
    
    pdf.text('صافي القيمة الحالية (NPV)', 25, y);
    pdf.text(formatCurrency(npv), pdf.internal.pageSize.width - 50, y, { align: 'right' });
    
    y += lineHeight;
    pdf.line(20, y - 5, pdf.internal.pageSize.width - 20, y - 5);
    
    pdf.text('فترة الاسترداد', 25, y);
    pdf.text(formatNumber(paybackPeriod) + ' سنوات', pdf.internal.pageSize.width - 50, y, { align: 'right' });
    
    y += lineHeight * 3;
    
    // إضافة جدول التدفقات النقدية
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('التدفقات النقدية المتوقعة:', 20, y);
    y += lineHeight * 1.5;
    
    // التحقق مما إذا كان الجدول سيتجاوز حدود الصفحة
    if (y > pdf.internal.pageSize.height - 50) {
        // إضافة صفحة جديدة
        pdf.addPage();
        currentPage++;
        y = 30;
        
        pdf.setFont('NotoNaskhArabic', 'bold');
        pdf.text('التدفقات النقدية المتوقعة:', 20, y);
        y += lineHeight * 1.5;
    }
    
    // رسم جدول التدفقات النقدية
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, y - 5, pdf.internal.pageSize.width - 40, 10, 'F');
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('السنة', 25, y);
    pdf.text('الإيرادات', 75, y);
    pdf.text('التكاليف', 125, y);
    pdf.text('التدفق النقدي', 175, y);
    
    y += lineHeight * 1.5;
    pdf.setFont('NotoNaskhArabic', 'normal');
    
    // جمع بيانات التدفقات النقدية
    const cashFlowData = getCashFlowData();
    
    // إضافة بيانات التدفقات النقدية
    cashFlowData.forEach((yearData, index) => {
        // التحقق مما إذا كان الجدول سيتجاوز حدود الصفحة
        if (y > pdf.internal.pageSize.height - 20) {
            // إضافة صفحة جديدة
            pdf.addPage();
            currentPage++;
            y = 30;
            
            // إعادة رسم رأس الجدول
            pdf.setFillColor(240, 240, 240);
            pdf.rect(20, y - 5, pdf.internal.pageSize.width - 40, 10, 'F');
            
            pdf.setFont('NotoNaskhArabic', 'bold');
            pdf.text('السنة', 25, y);
            pdf.text('الإيرادات', 75, y);
            pdf.text('التكاليف', 125, y);
            pdf.text('التدفق النقدي', 175, y);
            
            y += lineHeight * 1.5;
            pdf.setFont('NotoNaskhArabic', 'normal');
        }
        
        // رسم خط أفقي
        pdf.setDrawColor(200, 200, 200);
        pdf.line(20, y - 5, pdf.internal.pageSize.width - 20, y - 5);
        
        // إضافة بيانات السنة
        pdf.text('السنة ' + (index + 1), 25, y);
        pdf.text(formatCurrency(yearData.revenue), 75, y);
        pdf.text(formatCurrency(yearData.costs), 125, y);
        pdf.text(formatCurrency(yearData.cashFlow), 175, y);
        
        y += lineHeight;
    });
    
    return currentPage;
}

// ===== الحصول على بيانات التدفقات النقدية =====
function getCashFlowData() {
    // جمع بيانات التدفقات النقدية من النموذج
    const cashFlowData = [];
    const yearElements = document.querySelectorAll('.cash-flow-year');
    
    yearElements.forEach((element, index) => {
        const revenueElement = element.querySelector('.year-revenue');
        const costsElement = element.querySelector('.year-costs');
        const cashFlowElement = element.querySelector('.year-cash-flow');
        
        if (revenueElement && costsElement && cashFlowElement) {
            cashFlowData.push({
                year: index + 1,
                revenue: revenueElement.value || '0',
                costs: costsElement.value || '0',
                cashFlow: cashFlowElement.value || '0'
            });
        }
    });
    
    // إذا لم تكن هناك بيانات، إنشاء بيانات افتراضية
    if (cashFlowData.length === 0) {
        for (let i = 0; i < 5; i++) {
            cashFlowData.push({
                year: i + 1,
                revenue: (100000 * (i + 1)).toString(),
                costs: (80000 * (i + 1)).toString(),
                cashFlow: (20000 * (i + 1)).toString()
            });
        }
    }
    
    return cashFlowData;
}

// ===== إضافة الرسوم البيانية =====
function addCharts(pdf, settings, currentPage) {
    console.log("إضافة الرسوم البيانية...");
    
    // إضافة صفحة جديدة إذا تم تحديد خيار تقسيم الأقسام
    if (settings.splitSections) {
        pdf.addPage();
        currentPage++;
    } else {
        // التحقق مما إذا كان هناك حاجة لصفحة جديدة
        const lastPage = pdf.internal.getCurrentPageInfo().pageNumber;
        if (lastPage !== currentPage) {
            currentPage = lastPage;
        }
    }
    
    // تحديث رقم الصفحة في جدول المحتويات
    if (settings.addTableOfContents && pdf.tocItems) {
        pdf.tocItems.find(item => item.title === 'الرسوم البيانية').page = currentPage;
    }
    
    // إضافة عنوان القسم
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.setFontSize(16);
    pdf.text('الرسوم البيانية', pdf.internal.pageSize.width / 2, 30, { align: 'center' });
    
    // إعداد نمط النص العادي
    pdf.setFont('NotoNaskhArabic', 'normal');
    pdf.setFontSize(12);
    
    // تحديد الرسوم البيانية المراد إضافتها
    const charts = [
        { id: 'demand-chart', title: 'الطلب المتوقع' },
        { id: 'revenue-expense-chart', title: 'الإيرادات والتكاليف' },
        { id: 'cash-flow-chart', title: 'التدفق النقدي' },
        { id: 'break-even-chart', title: 'نقطة التعادل' },
        { id: 'sensitivity-chart', title: 'تحليل الحساسية' },
        { id: 'competitors-chart', title: 'تحليل المنافسين' },
        { id: 'financial-indicators-chart', title: 'المؤشرات المالية' },
        { id: 'swot-chart', title: 'تحليل SWOT' }
    ];
    
    // إضافة الرسوم البيانية
    let y = 50;
    const chartHeight = settings.chartsSettings.height / 4; // تحويل من بكسل إلى مم
    
    charts.forEach(chart => {
        // التحقق من وجود الرسم البياني
        const chartElement = document.getElementById(chart.id);
        
        if (chartElement) {
            // التحقق مما إذا كان الرسم البياني سيتجاوز حدود الصفحة
            if (y + chartHeight + 20 > pdf.internal.pageSize.height) {
                // إضافة صفحة جديدة
                pdf.addPage();
                currentPage++;
                y = 30;
            }
            
            // إضافة عنوان الرسم البياني
            if (settings.chartsSettings.includeChartTitles) {
                pdf.setFont('NotoNaskhArabic', 'bold');
                pdf.setFontSize(14);
                pdf.text(chart.title, pdf.internal.pageSize.width / 2, y, { align: 'center' });
                y += 10;
            }
            
            try {
                // تحويل الرسم البياني إلى صورة
                const chartImage = chartElement.toDataURL('image/png');
                
                // حساب عرض وارتفاع الصورة
                const imgWidth = Math.min(pdf.internal.pageSize.width - 40, settings.chartsSettings.width / 4); // تحويل من بكسل إلى مم
                const imgHeight = chartHeight;
                
                // إضافة الصورة إلى المستند
                pdf.addImage(chartImage, 'PNG', (pdf.internal.pageSize.width - imgWidth) / 2, y, imgWidth, imgHeight);
                
                y += imgHeight + 20;
            } catch (error) {
                console.error('خطأ في تحويل الرسم البياني إلى صورة:', error);
                
                // إضافة رسالة خطأ
                pdf.setFont('NotoNaskhArabic', 'normal');
                pdf.setFontSize(12);
                pdf.text('تعذر تحميل الرسم البياني: ' + chart.title, pdf.internal.pageSize.width / 2, y + 10, { align: 'center' });
                
                y += 30;
            }
        }
    });
    
    return currentPage;
}

// ===== إضافة التوصيات =====
function addRecommendations(pdf, settings, currentPage) {
    console.log("إضافة التوصيات...");
    
    // إضافة صفحة جديدة إذا تم تحديد خيار تقسيم الأقسام
    if (settings.splitSections) {
        pdf.addPage();
        currentPage++;
    } else {
        // التحقق مما إذا كان هناك حاجة لصفحة جديدة
        const lastPage = pdf.internal.getCurrentPageInfo().pageNumber;
        if (lastPage !== currentPage) {
            currentPage = lastPage;
        }
    }
    
    // تحديث رقم الصفحة في جدول المحتويات
    if (settings.addTableOfContents && pdf.tocItems) {
        pdf.tocItems.find(item => item.title === 'التوصيات').page = currentPage;
    }
    
    // إضافة عنوان القسم
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.setFontSize(16);
    pdf.text('التوصيات', pdf.internal.pageSize.width / 2, 30, { align: 'center' });
    
    // إعداد نمط النص العادي
    pdf.setFont('NotoNaskhArabic', 'normal');
    pdf.setFontSize(12);
    
    // جمع التوصيات من النموذج
    const recommendationsContainer = document.getElementById('recommendations-container');
    let recommendations = [];
    
    if (recommendationsContainer) {
        const recommendationItems = recommendationsContainer.querySelectorAll('li');
        
        recommendationItems.forEach(item => {
            recommendations.push(item.textContent);
        });
    }
    
    // إذا لم تكن هناك توصيات، إضافة توصيات افتراضية
    if (recommendations.length === 0) {
        recommendations = [
            'تحسين استراتيجية التسويق لزيادة الوعي بالمنتج/الخدمة',
            'تقليل التكاليف الثابتة لتحسين نقطة التعادل',
            'زيادة سعر البيع بنسبة معقولة لتحسين هامش الربح',
            'تنويع مصادر الإيرادات لتقليل المخاطر',
            'تحسين كفاءة العمليات لتقليل التكاليف المتغيرة',
            'الاستثمار في تدريب الموظفين لزيادة الإنتاجية',
            'تطوير منتجات/خدمات جديدة لتلبية احتياجات العملاء المتغيرة',
            'بناء شراكات استراتيجية لتوسيع نطاق السوق'
        ];
    }
    
    // إضافة التوصيات
    let y = 50;
    const lineHeight = 10;
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('التوصيات الرئيسية:', 20, y);
    y += lineHeight * 1.5;
    
    pdf.setFont('NotoNaskhArabic', 'normal');
    
    recommendations.forEach((recommendation, index) => {
        // التحقق مما إذا كان النص سيتجاوز حدود الصفحة
        if (y > pdf.internal.pageSize.height - 20) {
            // إضافة صفحة جديدة
            pdf.addPage();
            currentPage++;
            y = 30;
        }
        
        // تقسيم التوصية إلى أسطر متعددة
        const recommendationLines = pdf.splitTextToSize(recommendation, pdf.internal.pageSize.width - 50);
        
        // إضافة رقم التوصية
        pdf.text((index + 1) + '. ', 20, y);
        
        // إضافة نص التوصية
        recommendationLines.forEach((line, lineIndex) => {
            pdf.text(line, 30, y + lineIndex * lineHeight);
        });
        
        // تحديث موضع Y للتوصية التالية
        y += lineHeight * (recommendationLines.length + 1);
    });
    
    return currentPage;
}

// ===== إضافة تحليل المخاطر =====
function addRiskAnalysis(pdf, settings, currentPage) {
    console.log("إضافة تحليل المخاطر...");
    
    // إضافة صفحة جديدة إذا تم تحديد خيار تقسيم الأقسام
    if (settings.splitSections) {
        pdf.addPage();
        currentPage++;
    } else {
        // التحقق مما إذا كان هناك حاجة لصفحة جديدة
        const lastPage = pdf.internal.getCurrentPageInfo().pageNumber;
        if (lastPage !== currentPage) {
            currentPage = lastPage;
        }
    }
    
    // تحديث رقم الصفحة في جدول المحتويات
    if (settings.addTableOfContents && pdf.tocItems) {
        pdf.tocItems.find(item => item.title === 'تحليل المخاطر').page = currentPage;
    }
    
    // إضافة عنوان القسم
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.setFontSize(16);
    pdf.text('تحليل المخاطر', pdf.internal.pageSize.width / 2, 30, { align: 'center' });
    
    // إعداد نمط النص العادي
    pdf.setFont('NotoNaskhArabic', 'normal');
    pdf.setFontSize(12);
    
    // جمع بيانات تحليل المخاطر من النموذج
    const riskData = getRiskData();
    
    // إضافة جدول تحليل المخاطر
    let y = 50;
    const lineHeight = 10;
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('تحليل المخاطر الرئيسية:', 20, y);
    y += lineHeight * 1.5;
    
    // رسم جدول تحليل المخاطر
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, y - 5, pdf.internal.pageSize.width - 40, 10, 'F');
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('نوع المخاطرة', 25, y);
    pdf.text('الاحتمالية', 100, y);
    pdf.text('التأثير', 140, y);
    pdf.text('استراتيجية التخفيف', 180, y);
    
    y += lineHeight * 1.5;
    pdf.setFont('NotoNaskhArabic', 'normal');
    
    // إضافة بيانات تحليل المخاطر
    riskData.forEach(risk => {
        // التحقق مما إذا كان الجدول سيتجاوز حدود الصفحة
        if (y > pdf.internal.pageSize.height - 30) {
            // إضافة صفحة جديدة
            pdf.addPage();
            currentPage++;
            y = 30;
            
            // إعادة رسم رأس الجدول
            pdf.setFillColor(240, 240, 240);
            pdf.rect(20, y - 5, pdf.internal.pageSize.width - 40, 10, 'F');
            
            pdf.setFont('NotoNaskhArabic', 'bold');
            pdf.text('نوع المخاطرة', 25, y);
            pdf.text('الاحتمالية', 100, y);
            pdf.text('التأثير', 140, y);
            pdf.text('استراتيجية التخفيف', 180, y);
            
            y += lineHeight * 1.5;
            pdf.setFont('NotoNaskhArabic', 'normal');
        }
        
        // رسم خط أفقي
        pdf.setDrawColor(200, 200, 200);
        pdf.line(20, y - 5, pdf.internal.pageSize.width - 20, y - 5);
        
        // إضافة بيانات المخاطرة
        pdf.text(risk.type, 25, y);
        pdf.text(risk.probability, 100, y);
        pdf.text(risk.impact, 140, y);
        
        // تقسيم استراتيجية التخفيف إلى أسطر متعددة
        const mitigationLines = pdf.splitTextToSize(risk.mitigation, 70);
        
        // إضافة استراتيجية التخفيف
        mitigationLines.forEach((line, index) => {
            pdf.text(line, 180, y + index * lineHeight);
        });
        
        // تحديث موضع Y للمخاطرة التالية
        y += lineHeight * (mitigationLines.length + 1);
    });
    
    // إضافة ملخص تحليل المخاطر
    y += lineHeight * 2;
    
    pdf.setFont('NotoNaskhArabic', 'bold');
    pdf.text('ملخص تحليل المخاطر:', 20, y);
    y += lineHeight * 1.5;
    
    pdf.setFont('NotoNaskhArabic', 'normal');
    
    // التحقق مما إذا كان النص سيتجاوز حدود الصفحة
    if (y > pdf.internal.pageSize.height - 50) {
        // إضافة صفحة جديدة
        pdf.addPage();
        currentPage++;
        y = 30;
        
        pdf.setFont('NotoNaskhArabic', 'bold');
        pdf.text('ملخص تحليل المخاطر:', 20, y);
        y += lineHeight * 1.5;
        
        pdf.setFont('NotoNaskhArabic', 'normal');
    }
    
    // إضافة ملخص تحليل المخاطر
    const riskSummary = getRiskSummary();
    
    // تقسيم ملخص تحليل المخاطر إلى أسطر متعددة
    const summaryLines = pdf.splitTextToSize(riskSummary, pdf.internal.pageSize.width - 40);
    
    // إضافة الأسطر إلى المستند
    summaryLines.forEach(line => {
        // التحقق مما إذا كان النص سيتجاوز حدود الصفحة
        if (y > pdf.internal.pageSize.height - 20) {
            // إضافة صفحة جديدة
            pdf.addPage();
            currentPage++;
            y = 30;
        }
        
        pdf.text(line, 20, y);
        y += lineHeight;
    });
    
    return currentPage;
}

// ===== الحصول على بيانات تحليل المخاطر =====
function getRiskData() {
    // جمع بيانات تحليل المخاطر من النموذج
    const riskData = [];
    const riskElements = document.querySelectorAll('.risk-item');
    
    riskElements.forEach(element => {
        const typeElement = element.querySelector('.risk-type');
        const probabilityElement = element.querySelector('.risk-probability');
        const impactElement = element.querySelector('.risk-impact');
        const mitigationElement = element.querySelector('.risk-mitigation');
        
        if (typeElement && probabilityElement && impactElement && mitigationElement) {
            riskData.push({
                type: typeElement.value || 'غير محدد',
                probability: getProbabilityText(probabilityElement.value),
                impact: getImpactText(impactElement.value),
                mitigation: mitigationElement.value || 'غير محدد'
            });
        }
    });
    
    // إذا لم تكن هناك بيانات، إنشاء بيانات افتراضية
    if (riskData.length === 0) {
        riskData.push(
            {
                type: 'مخاطر السوق',
                probability: 'متوسطة',
                impact: 'مرتفع',
                mitigation: 'تنويع المنتجات/الخدمات وتوسيع قاعدة العملاء'
            },
            {
                type: 'مخاطر مالية',
                probability: 'منخفضة',
                impact: 'مرتفع',
                mitigation: 'الاحتفاظ باحتياطي نقدي كافٍ وتنويع مصادر التمويل'
            },
            {
                type: 'مخاطر تشغيلية',
                probability: 'متوسطة',
                impact: 'متوسط',
                mitigation: 'تحسين العمليات وتدريب الموظفين وتطوير أنظمة الرقابة'
            },
            {
                type: 'مخاطر قانونية',
                probability: 'منخفضة',
                impact: 'مرتفع',
                mitigation: 'استشارة خبراء قانونيين وتحسين الامتثال للقوانين واللوائح'
            }
        );
    }
    
    return riskData;
}

// ===== الحصول على نص الاحتمالية =====
function getProbabilityText(value) {
    const probabilityValue = parseFloat(value);
    
    if (probabilityValue <= 1) {
        return 'منخفضة جداً';
    } else if (probabilityValue <= 2) {
        return 'منخفضة';
    } else if (probabilityValue <= 3) {
        return 'متوسطة';
    } else if (probabilityValue <= 4) {
        return 'مرتفعة';
    } else {
        return 'مرتفعة جداً';
    }
}

// ===== الحصول على نص التأثير =====
function getImpactText(value) {
    const impactValue = parseFloat(value);
    
    if (impactValue <= 1) {
        return 'منخفض جداً';
    } else if (impactValue <= 2) {
        return 'منخفض';
    } else if (impactValue <= 3) {
        return 'متوسط';
    } else if (impactValue <= 4) {
        return 'مرتفع';
    } else {
        return 'مرتفع جداً';
    }
}

// ===== الحصول على ملخص تحليل المخاطر =====
function getRiskSummary() {
    // جمع ملخص تحليل المخاطر من النموذج
    const riskSummaryElement = document.getElementById('risk-summary');
    
    if (riskSummaryElement && riskSummaryElement.value) {
        return riskSummaryElement.value;
    }
    
    // إذا لم يكن هناك ملخص، إنشاء ملخص افتراضي
    return 'بناءً على تحليل المخاطر، يمكن القول أن المشروع يواجه مخاطر متوسطة بشكل عام. تتركز المخاطر الرئيسية في مخاطر السوق والمخاطر التشغيلية، بينما تعتبر المخاطر المالية والقانونية أقل احتمالية. تم وضع استراتيجيات مناسبة للتخفيف من هذه المخاطر، مما يزيد من فرص نجاح المشروع. يوصى بمراجعة وتحديث تحليل المخاطر بشكل دوري للتأكد من فعالية استراتيجيات التخفيف وتحديد أي مخاطر جديدة قد تظهر.';
}

// ===== تنسيق العملة =====
function formatCurrency(value) {
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
        return '0.00 $';
    }
    
    return numValue.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' $';
}

// ===== تنسيق الأرقام =====
function formatNumber(value) {
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
        return '0';
    }
    
    return numValue.toLocaleString('ar-SA', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

// ===== إظهار مؤشر التحميل =====
function showLoadingIndicator(message) {
    // إنشاء عنصر مؤشر التحميل
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loading-indicator';
    loadingIndicator.className = 'loading-indicator';
    
    // إضافة رسالة التحميل
    const loadingMessage = document.createElement('p');
    loadingMessage.textContent = message || 'جاري التحميل...';
    loadingIndicator.appendChild(loadingMessage);
    
    // إضافة أيقونة التحميل
    const loadingIcon = document.createElement('div');
    loadingIcon.className = 'loading-spinner';
    loadingIndicator.appendChild(loadingIcon);
    
    // إضافة مؤشر التحميل إلى المستند
    document.body.appendChild(loadingIndicator);
}

// ===== إخفاء مؤشر التحميل =====
function hideLoadingIndicator() {
    // إزالة مؤشر التحميل من المستند
    const loadingIndicator = document.getElementById('loading-indicator');
    
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
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
window.initPDFExport = initPDFExport;
window.openExportSettingsModal = openExportSettingsModal;
window.closeExportSettingsModal = closeExportSettingsModal;
window.exportToPDF = exportToPDF;
