// نظام إدخال البيانات الديناميكي
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة النظام
    initDynamicInputSystem();
});

// ===== تهيئة نظام الإدخال الديناميكي =====
function initDynamicInputSystem() {
    // إعداد نوافذ إضافة المنتجات
    setupProductModal();
    
    // إعداد نوافذ إضافة المواد الخام
    setupRawMaterialModal();
    
    // إعداد نوافذ إضافة المنافسين
    setupCompetitorModal();
    
    // إعداد نوافذ إضافة الموظفين
    setupEmployeeModal();
    
    // إعداد نوافذ إضافة المصاريف الثابتة
    setupFixedExpenseModal();
    
    // إعداد نوافذ إضافة المصاريف المتغيرة
    setupVariableExpenseModal();
    
    // إعداد حقول الإدخال مع الاقتراحات التلقائية
    setupAutocompleteFields();
    
    // إعداد حقول الإدخال مع التحقق المباشر
    setupLiveValidation();
    
    // إعداد حقول الإدخال مع التنسيق التلقائي
    setupAutoFormatting();
    
    // إعداد نظام حفظ البيانات المؤقت
    setupAutoSave();
}

// ===== إعداد نافذة إضافة المنتجات =====
function setupProductModal() {
    const addProductBtn = document.getElementById('add-product-btn');
    const productModal = document.getElementById('product-modal');
    const cancelProductBtn = document.getElementById('cancel-product');
    const saveProductBtn = document.getElementById('save-product');
    const productsContainer = document.getElementById('products-container');
    const productForm = document.getElementById('product-form');
    
    if (addProductBtn && productModal && cancelProductBtn && saveProductBtn && productsContainer && productForm) {
        // فتح النافذة
        addProductBtn.addEventListener('click', function() {
            // إعادة تعيين النموذج
            productForm.reset();
            
            // تعيين التركيز على الحقل الأول
            document.getElementById('product_name').focus();
            
            // عرض النافذة
            productModal.classList.remove('hidden');
            
            // تحريك النافذة إلى المركز
            centerModal(productModal);
        });
        
        // إغلاق النافذة
        cancelProductBtn.addEventListener('click', function() {
            productModal.classList.add('hidden');
        });
        
        // إغلاق النافذة عند النقر خارجها
        productModal.addEventListener('click', function(e) {
            if (e.target === productModal) {
                productModal.classList.add('hidden');
            }
        });
        
        // حفظ المنتج
        saveProductBtn.addEventListener('click', function() {
            const productName = document.getElementById('product_name').value;
            const productDescription = document.getElementById('product_description').value;
            const productPrice = document.getElementById('product_price').value;
            const productCost = document.getElementById('product_cost').value;
            const productUnit = document.getElementById('product_unit').value;
            
            if (productName.trim() === '') {
                showFieldError('product_name', 'يرجى إدخال اسم المنتج');
                return;
            }
            
            if (productPrice.trim() === '') {
                showFieldError('product_price', 'يرجى إدخال سعر المنتج');
                return;
            }
            
            // إنشاء عنصر المنتج
            const productItem = document.createElement('div');
            productItem.className = 'product-item bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600 mb-3 transition-all hover:shadow-md';
            productItem.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-grow">
                        <h4 class="font-medium text-lg">${productName}</h4>
                        <p class="text-gray-600 dark:text-gray-300 mt-1">${productDescription || 'لا يوجد وصف'}</p>
                        <div class="flex flex-wrap gap-2 mt-2">
                            <span class="badge badge-primary">${productPrice || '0'} $</span>
                            <span class="badge badge-secondary">التكلفة: ${productCost || '0'} $</span>
                            <span class="badge badge-info">الوحدة: ${productUnit || 'قطعة'}</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <button type="button" class="edit-product btn btn-secondary p-1 ml-2" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="remove-product btn btn-danger p-1 ml-2" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <input type="hidden" name="product_name[]" value="${productName}">
                <input type="hidden" name="product_description[]" value="${productDescription}">
                <input type="hidden" name="product_price[]" value="${productPrice}">
                <input type="hidden" name="product_cost[]" value="${productCost}">
                <input type="hidden" name="product_unit[]" value="${productUnit}">
            `;
            
            // إضافة المنتج إلى الحاوية
            productsContainer.appendChild(productItem);
            
            // إضافة مستمع حدث لزر الحذف
            productItem.querySelector('.remove-product').addEventListener('click', function() {
                // إضافة تأثير الحذف
                productItem.classList.add('scale-95', 'opacity-50');
                
                // حذف العنصر بعد التأثير
                setTimeout(() => {
                    productsContainer.removeChild(productItem);
                    updateFinancialData();
                    updateProgress();
                }, 300);
            });
            
            // إضافة مستمع حدث لزر التعديل
            productItem.querySelector('.edit-product').addEventListener('click', function() {
                // ملء النموذج بالبيانات الحالية
                document.getElementById('product_name').value = productItem.querySelector('input[name="product_name[]"]').value;
                document.getElementById('product_description').value = productItem.querySelector('input[name="product_description[]"]').value;
                document.getElementById('product_price').value = productItem.querySelector('input[name="product_price[]"]').value;
                document.getElementById('product_cost').value = productItem.querySelector('input[name="product_cost[]"]').value;
                document.getElementById('product_unit').value = productItem.querySelector('input[name="product_unit[]"]').value;
                
                // حذف المنتج الحالي
                productsContainer.removeChild(productItem);
                
                // فتح النافذة
                productModal.classList.remove('hidden');
                centerModal(productModal);
            });
            
            // إغلاق النافذة
            productModal.classList.add('hidden');
            
            // تحديث البيانات المالية
            updateFinancialData();
            
            // تحديث شريط التقدم
            updateProgress();
            
            // عرض إشعار نجاح
            showNotification('تم إضافة المنتج بنجاح');
        });
        
        // إضافة مستمع للنموذج لمنع الإرسال الافتراضي
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProductBtn.click();
        });
        
        // إضافة مستمع لحقل السعر للتحقق من الإدخال
        const productPriceInput = document.getElementById('product_price');
        if (productPriceInput) {
            productPriceInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9.]/g, '');
            });
        }
        
        // إضافة مستمع لحقل التكلفة للتحقق من الإدخال
        const productCostInput = document.getElementById('product_cost');
        if (productCostInput) {
            productCostInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9.]/g, '');
            });
        }
    }
}

// ===== إعداد نافذة إضافة المواد الخام =====
function setupRawMaterialModal() {
    const addRawMaterialBtn = document.getElementById('add-raw-material-btn');
    const rawMaterialModal = document.getElementById('raw-material-modal');
    const cancelRawMaterialBtn = document.getElementById('cancel-raw-material');
    const saveRawMaterialBtn = document.getElementById('save-raw-material');
    const rawMaterialsContainer = document.getElementById('raw-materials-container');
    const rawMaterialForm = document.getElementById('raw-material-form');
    
    if (addRawMaterialBtn && rawMaterialModal && cancelRawMaterialBtn && saveRawMaterialBtn && rawMaterialsContainer && rawMaterialForm) {
        // فتح النافذة
        addRawMaterialBtn.addEventListener('click', function() {
            // إعادة تعيين النموذج
            rawMaterialForm.reset();
            
            // تعيين التركيز على الحقل الأول
            document.getElementById('raw_material_name').focus();
            
            // عرض النافذة
            rawMaterialModal.classList.remove('hidden');
            
            // تحريك النافذة إلى المركز
            centerModal(rawMaterialModal);
        });
        
        // إغلاق النافذة
        cancelRawMaterialBtn.addEventListener('click', function() {
            rawMaterialModal.classList.add('hidden');
        });
        
        // إغلاق النافذة عند النقر خارجها
        rawMaterialModal.addEventListener('click', function(e) {
            if (e.target === rawMaterialModal) {
                rawMaterialModal.classList.add('hidden');
            }
        });
        
        // حفظ المادة الخام
        saveRawMaterialBtn.addEventListener('click', function() {
            const rawMaterialName = document.getElementById('raw_material_name').value;
            const rawMaterialDescription = document.getElementById('raw_material_description').value;
            const rawMaterialPrice = document.getElementById('raw_material_price').value;
            const rawMaterialUnit = document.getElementById('raw_material_unit').value;
            const rawMaterialQuantity = document.getElementById('raw_material_quantity').value;
            
            if (rawMaterialName.trim() === '') {
                showFieldError('raw_material_name', 'يرجى إدخال اسم المادة الخام');
                return;
            }
            
            if (rawMaterialPrice.trim() === '') {
                showFieldError('raw_material_price', 'يرجى إدخال سعر المادة الخام');
                return;
            }
            
            // إنشاء عنصر المادة الخام
            const rawMaterialItem = document.createElement('div');
            rawMaterialItem.className = 'raw-material-item bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600 mb-3 transition-all hover:shadow-md';
            rawMaterialItem.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-grow">
                        <h4 class="font-medium text-lg">${rawMaterialName}</h4>
                        <p class="text-gray-600 dark:text-gray-300 mt-1">${rawMaterialDescription || 'لا يوجد وصف'}</p>
                        <div class="flex flex-wrap gap-2 mt-2">
                            <span class="badge badge-primary">${rawMaterialPrice || '0'} $</span>
                            <span class="badge badge-secondary">الكمية: ${rawMaterialQuantity || '0'} ${rawMaterialUnit || 'وحدة'}</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <button type="button" class="edit-raw-material btn btn-secondary p-1 ml-2" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="remove-raw-material btn btn-danger p-1 ml-2" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <input type="hidden" name="raw_material_name[]" value="${rawMaterialName}">
                <input type="hidden" name="raw_material_description[]" value="${rawMaterialDescription}">
                <input type="hidden" name="raw_material_price[]" value="${rawMaterialPrice}">
                <input type="hidden" name="raw_material_unit[]" value="${rawMaterialUnit}">
                <input type="hidden" name="raw_material_quantity[]" value="${rawMaterialQuantity}">
            `;
            
            // إضافة المادة الخام إلى الحاوية
            rawMaterialsContainer.appendChild(rawMaterialItem);
            
            // إضافة مستمع حدث لزر الحذف
            rawMaterialItem.querySelector('.remove-raw-material').addEventListener('click', function() {
                // إضافة تأثير الحذف
                rawMaterialItem.classList.add('scale-95', 'opacity-50');
                
                // حذف العنصر بعد التأثير
                setTimeout(() => {
                    rawMaterialsContainer.removeChild(rawMaterialItem);
                    updateFinancialData();
                    updateProgress();
                }, 300);
            });
            
            // إضافة مستمع حدث لزر التعديل
            rawMaterialItem.querySelector('.edit-raw-material').addEventListener('click', function() {
                // ملء النموذج بالبيانات الحالية
                document.getElementById('raw_material_name').value = rawMaterialItem.querySelector('input[name="raw_material_name[]"]').value;
                document.getElementById('raw_material_description').value = rawMaterialItem.querySelector('input[name="raw_material_description[]"]').value;
                document.getElementById('raw_material_price').value = rawMaterialItem.querySelector('input[name="raw_material_price[]"]').value;
                document.getElementById('raw_material_unit').value = rawMaterialItem.querySelector('input[name="raw_material_unit[]"]').value;
                document.getElementById('raw_material_quantity').value = rawMaterialItem.querySelector('input[name="raw_material_quantity[]"]').value;
                
                // حذف المادة الخام الحالية
                rawMaterialsContainer.removeChild(rawMaterialItem);
                
                // فتح النافذة
                rawMaterialModal.classList.remove('hidden');
                centerModal(rawMaterialModal);
            });
            
            // إغلاق النافذة
            rawMaterialModal.classList.add('hidden');
            
            // تحديث البيانات المالية
            updateFinancialData();
            
            // تحديث شريط التقدم
            updateProgress();
            
            // عرض إشعار نجاح
            showNotification('تم إضافة المادة الخام بنجاح');
        });
        
        // إضافة مستمع للنموذج لمنع الإرسال الافتراضي
        rawMaterialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveRawMaterialBtn.click();
        });
        
        // إضافة مستمع لحقل السعر للتحقق من الإدخال
        const rawMaterialPriceInput = document.getElementById('raw_material_price');
        if (rawMaterialPriceInput) {
            rawMaterialPriceInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9.]/g, '');
            });
        }
        
        // إضافة مستمع لحقل الكمية للتحقق من الإدخال
        const rawMaterialQuantityInput = document.getElementById('raw_material_quantity');
        if (rawMaterialQuantityInput) {
            rawMaterialQuantityInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9.]/g, '');
            });
        }
    }
}

// ===== إعداد نافذة إضافة المنافسين =====
function setupCompetitorModal() {
    const addCompetitorBtn = document.getElementById('add-competitor-btn');
    const competitorModal = document.getElementById('competitor-modal');
    const cancelCompetitorBtn = document.getElementById('cancel-competitor');
    const saveCompetitorBtn = document.getElementById('save-competitor');
    const competitorsContainer = document.getElementById('competitors-container');
    const competitorForm = document.getElementById('competitor-form');
    
    if (addCompetitorBtn && competitorModal && cancelCompetitorBtn && saveCompetitorBtn && competitorsContainer && competitorForm) {
        // فتح النافذة
        addCompetitorBtn.addEventListener('click', function() {
            // إعادة تعيين النموذج
            competitorForm.reset();
            
            // تعيين التركيز على الحقل الأول
            document.getElementById('competitor_name').focus();
            
            // عرض النافذة
            competitorModal.classList.remove('hidden');
            
            // تحريك النافذة إلى المركز
            centerModal(competitorModal);
        });
        
        // إغلاق النافذة
        cancelCompetitorBtn.addEventListener('click', function() {
            competitorModal.classList.add('hidden');
        });
        
        // إغلاق النافذة عند النقر خارجها
        competitorModal.addEventListener('click', function(e) {
            if (e.target === competitorModal) {
                competitorModal.classList.add('hidden');
            }
        });
        
        // حفظ المنافس
        saveCompetitorBtn.addEventListener('click', function() {
            const competitorName = document.getElementById('competitor_name').value;
            const competitorStrength = document.getElementById('competitor_strength').value;
            const competitorWeakness = document.getElementById('competitor_weakness').value;
            const competitorMarketShare = document.getElementById('competitor_market_share').value;
            
            if (competitorName.trim() === '') {
                showFieldError('competitor_name', 'يرجى إدخال اسم المنافس');
                return;
            }
            
            // إنشاء عنصر المنافس
            const competitorItem = document.createElement('div');
            competitorItem.className = 'competitor-item bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600 mb-3 transition-all hover:shadow-md';
            competitorItem.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-grow">
                        <h4 class="font-medium text-lg">${competitorName}</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            <div>
                                <h5 class="text-sm font-medium text-green-600 dark:text-green-400">نقاط القوة:</h5>
                                <p class="text-gray-600 dark:text-gray-300">${competitorStrength || 'لا توجد معلومات'}</p>
                            </div>
                            <div>
                                <h5 class="text-sm font-medium text-red-600 dark:text-red-400">نقاط الضعف:</h5>
                                <p class="text-gray-600 dark:text-gray-300">${competitorWeakness || 'لا توجد معلومات'}</p>
                            </div>
                        </div>
                        ${competitorMarketShare ? `<div class="mt-2">
                            <span class="badge badge-primary">الحصة السوقية: ${competitorMarketShare}%</span>
                        </div>` : ''}
                    </div>
                    <div class="flex items-center">
                        <button type="button" class="edit-competitor btn btn-secondary p-1 ml-2" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="remove-competitor btn btn-danger p-1 ml-2" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <input type="hidden" name="competitor_name[]" value="${competitorName}">
                <input type="hidden" name="competitor_strength[]" value="${competitorStrength}">
                <input type="hidden" name="competitor_weakness[]" value="${competitorWeakness}">
                <input type="hidden" name="competitor_market_share[]" value="${competitorMarketShare}">
            `;
            
            // إضافة المنافس إلى الحاوية
            competitorsContainer.appendChild(competitorItem);
            
            // إضافة مستمع حدث لزر الحذف
            competitorItem.querySelector('.remove-competitor').addEventListener('click', function() {
                // إضافة تأثير الحذف
                competitorItem.classList.add('scale-95', 'opacity-50');
                
                // حذف العنصر بعد التأثير
                setTimeout(() => {
                    competitorsContainer.removeChild(competitorItem);
                    updateProgress();
                }, 300);
            });
            
            // إضافة مستمع حدث لزر التعديل
            competitorItem.querySelector('.edit-competitor').addEventListener('click', function() {
                // ملء النموذج بالبيانات الحالية
                document.getElementById('competitor_name').value = competitorItem.querySelector('input[name="competitor_name[]"]').value;
                document.getElementById('competitor_strength').value = competitorItem.querySelector('input[name="competitor_strength[]"]').value;
                document.getElementById('competitor_weakness').value = competitorItem.querySelector('input[name="competitor_weakness[]"]').value;
                document.getElementById('competitor_market_share').value = competitorItem.querySelector('input[name="competitor_market_share[]"]').value;
                
                // حذف المنافس الحالي
                competitorsContainer.removeChild(competitorItem);
                
                // فتح النافذة
                competitorModal.classList.remove('hidden');
                centerModal(competitorModal);
            });
            
            // إغلاق النافذة
            competitorModal.classList.add('hidden');
            
            // تحديث شريط التقدم
            updateProgress();
            
            // عرض إشعار نجاح
            showNotification('تم إضافة المنافس بنجاح');
        });
        
        // إضافة مستمع للنموذج لمنع الإرسال الافتراضي
        competitorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveCompetitorBtn.click();
        });
        
        // إضافة مستمع لحقل الحصة السوقية للتحقق من الإدخال
        const competitorMarketShareInput = document.getElementById('competitor_market_share');
        if (competitorMarketShareInput) {
            competitorMarketShareInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9.]/g, '');
                if (parseFloat(this.value) > 100) {
                    this.value = '100';
                }
            });
        }
    }
}

// ===== إعداد نافذة إضافة الموظفين =====
function setupEmployeeModal() {
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const employeeModal = document.getElementById('employee-modal');
    const cancelEmployeeBtn = document.getElementById('cancel-employee');
    const saveEmployeeBtn = document.getElementById('save-employee');
    const employeesContainer = document.getElementById('employees-container');
    const employeeForm = document.getElementById('employee-form');
    
    if (addEmployeeBtn && employeeModal && cancelEmployeeBtn && saveEmployeeBtn && employeesContainer && employeeForm) {
        // فتح النافذة
        addEmployeeBtn.addEventListener('click', function() {
            // إعادة تعيين النموذج
            employeeForm.reset();
            
            // تعيين التركيز على الحقل الأول
            document.getElementById('employee_position').focus();
            
            // عرض النافذة
            employeeModal.classList.remove('hidden');
            
            // تحريك النافذة إلى المركز
            centerModal(employeeModal);
        });
        
        // إغلاق النافذة
        cancelEmployeeBtn.addEventListener('click', function() {
            employeeModal.classList.add('hidden');
        });
        
        // إغلاق النافذة عند النقر خارجها
        employeeModal.addEventListener('click', function(e) {
            if (e.target === employeeModal) {
                employeeModal.classList.add('hidden');
            }
        });
        
        // حفظ الموظف
        saveEmployeeBtn.addEventListener('click', function() {
            const employeePosition = document.getElementById('employee_position').value;
            const employeeCount = document.getElementById('employee_count').value;
            const employeeSalary = document.getElementById('employee_salary').value;
            const employeeNotes = document.getElementById('employee_notes').value;
            
            if (employeePosition.trim() === '') {
                showFieldError('employee_position', 'يرجى إدخال المسمى الوظيفي');
                return;
            }
            
            if (employeeSalary.trim() === '') {
                showFieldError('employee_salary', 'يرجى إدخال الراتب الشهري');
                return;
            }
            
            // إنشاء عنصر الموظف
            const employeeItem = document.createElement('div');
            employeeItem.className = 'employee-item bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600 mb-3 transition-all hover:shadow-md';
            employeeItem.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-grow">
                        <h4 class="font-medium text-lg">${employeePosition}</h4>
                        <div class="flex flex-wrap gap-2 mt-2">
                            <span class="badge badge-primary">العدد: ${employeeCount || '1'}</span>
                            <span class="badge badge-secondary">الراتب: ${employeeSalary} $ شهرياً</span>
                        </div>
                        ${employeeNotes ? `<p class="text-gray-600 dark:text-gray-300 mt-2">${employeeNotes}</p>` : ''}
                    </div>
                    <div class="flex items-center">
                        <button type="button" class="edit-employee btn btn-secondary p-1 ml-2" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="remove-employee btn btn-danger p-1 ml-2" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <input type="hidden" name="employee_position[]" value="${employeePosition}">
                <input type="hidden" name="employee_count[]" value="${employeeCount}">
                <input type="hidden" name="employee_salary[]" value="${employeeSalary}">
                <input type="hidden" name="employee_notes[]" value="${employeeNotes}">
            `;
            
            // إضافة الموظف إلى الحاوية
            employeesContainer.appendChild(employeeItem);
            
            // إضافة مستمع حدث لزر الحذف
            employeeItem.querySelector('.remove-employee').addEventListener('click', function() {
                // إضافة تأثير الحذف
                employeeItem.classList.add('scale-95', 'opacity-50');
                
                // حذف العنصر بعد التأثير
                setTimeout(() => {
                    employeesContainer.removeChild(employeeItem);
                    updateFinancialData();
                    updateProgress();
                }, 300);
            });
            
            // إضافة مستمع حدث لزر التعديل
            employeeItem.querySelector('.edit-employee').addEventListener('click', function() {
                // ملء النموذج بالبيانات الحالية
                document.getElementById('employee_position').value = employeeItem.querySelector('input[name="employee_position[]"]').value;
                document.getElementById('employee_count').value = employeeItem.querySelector('input[name="employee_count[]"]').value;
                document.getElementById('employee_salary').value = employeeItem.querySelector('input[name="employee_salary[]"]').value;
                document.getElementById('employee_notes').value = employeeItem.querySelector('input[name="employee_notes[]"]').value;
                
                // حذف الموظف الحالي
                employeesContainer.removeChild(employeeItem);
                
                // فتح النافذة
                employeeModal.classList.remove('hidden');
                centerModal(employeeModal);
            });
            
            // إغلاق النافذة
            employeeModal.classList.add('hidden');
            
            // تحديث البيانات المالية
            updateFinancialData();
            
            // تحديث شريط التقدم
            updateProgress();
            
            // عرض إشعار نجاح
            showNotification('تم إضافة الموظف بنجاح');
        });
        
        // إضافة مستمع للنموذج لمنع الإرسال الافتراضي
        employeeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveEmployeeBtn.click();
        });
        
        // إضافة مستمع لحقل العدد للتحقق من الإدخال
        const employeeCountInput = document.getElementById('employee_count');
        if (employeeCountInput) {
            employeeCountInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9]/g, '');
                if (this.value === '0') {
                    this.value = '1';
                }
            });
        }
        
        // إضافة مستمع لحقل الراتب للتحقق من الإدخال
        const employeeSalaryInput = document.getElementById('employee_salary');
        if (employeeSalaryInput) {
            employeeSalaryInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9.]/g, '');
            });
        }
    }
}

// ===== إعداد نافذة إضافة المصاريف الثابتة =====
function setupFixedExpenseModal() {
    const addFixedExpenseBtn = document.getElementById('add-fixed-expense-btn');
    const fixedExpenseModal = document.getElementById('fixed-expense-modal');
    const cancelFixedExpenseBtn = document.getElementById('cancel-fixed-expense');
    const saveFixedExpenseBtn = document.getElementById('save-fixed-expense');
    const fixedExpensesContainer = document.getElementById('fixed-expenses-container');
    const fixedExpenseForm = document.getElementById('fixed-expense-form');
    
    if (addFixedExpenseBtn && fixedExpenseModal && cancelFixedExpenseBtn && saveFixedExpenseBtn && fixedExpensesContainer && fixedExpenseForm) {
        // فتح النافذة
        addFixedExpenseBtn.addEventListener('click', function() {
            // إعادة تعيين النموذج
            fixedExpenseForm.reset();
            
            // تعيين التركيز على الحقل الأول
            document.getElementById('fixed_expense_name').focus();
            
            // عرض النافذة
            fixedExpenseModal.classList.remove('hidden');
            
            // تحريك النافذة إلى المركز
            centerModal(fixedExpenseModal);
        });
        
        // إغلاق النافذة
        cancelFixedExpenseBtn.addEventListener('click', function() {
            fixedExpenseModal.classList.add('hidden');
        });
        
        // إغلاق النافذة عند النقر خارجها
        fixedExpenseModal.addEventListener('click', function(e) {
            if (e.target === fixedExpenseModal) {
                fixedExpenseModal.classList.add('hidden');
            }
        });
        
        // حفظ المصروف الثابت
        saveFixedExpenseBtn.addEventListener('click', function() {
            const fixedExpenseName = document.getElementById('fixed_expense_name').value;
            const fixedExpenseAmount = document.getElementById('fixed_expense_amount').value;
            const fixedExpensePeriod = document.getElementById('fixed_expense_period').value;
            const fixedExpenseNotes = document.getElementById('fixed_expense_notes').value;
            
            if (fixedExpenseName.trim() === '') {
                showFieldError('fixed_expense_name', 'يرجى إدخال اسم المصروف');
                return;
            }
            
            if (fixedExpenseAmount.trim() === '') {
                showFieldError('fixed_expense_amount', 'يرجى إدخال قيمة المصروف');
                return;
            }
            
            // إنشاء عنصر المصروف الثابت
            const fixedExpenseItem = document.createElement('div');
            fixedExpenseItem.className = 'fixed-expense-item bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600 mb-3 transition-all hover:shadow-md';
            fixedExpenseItem.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-grow">
                        <h4 class="font-medium text-lg">${fixedExpenseName}</h4>
                        <div class="flex flex-wrap gap-2 mt-2">
                            <span class="badge badge-primary">${fixedExpenseAmount} $</span>
                            <span class="badge badge-secondary">الفترة: ${getPeriodText(fixedExpensePeriod)}</span>
                        </div>
                        ${fixedExpenseNotes ? `<p class="text-gray-600 dark:text-gray-300 mt-2">${fixedExpenseNotes}</p>` : ''}
                    </div>
                    <div class="flex items-center">
                        <button type="button" class="edit-fixed-expense btn btn-secondary p-1 ml-2" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="remove-fixed-expense btn btn-danger p-1 ml-2" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <input type="hidden" name="fixed_expense_name[]" value="${fixedExpenseName}">
                <input type="hidden" name="fixed_expense_amount[]" value="${fixedExpenseAmount}">
                <input type="hidden" name="fixed_expense_period[]" value="${fixedExpensePeriod}">
                <input type="hidden" name="fixed_expense_notes[]" value="${fixedExpenseNotes}">
            `;
            
            // إضافة المصروف الثابت إلى الحاوية
            fixedExpensesContainer.appendChild(fixedExpenseItem);
            
            // إضافة مستمع حدث لزر الحذف
            fixedExpenseItem.querySelector('.remove-fixed-expense').addEventListener('click', function() {
                // إضافة تأثير الحذف
                fixedExpenseItem.classList.add('scale-95', 'opacity-50');
                
                // حذف العنصر بعد التأثير
                setTimeout(() => {
                    fixedExpensesContainer.removeChild(fixedExpenseItem);
                    updateFinancialData();
                    updateProgress();
                }, 300);
            });
            
            // إضافة مستمع حدث لزر التعديل
            fixedExpenseItem.querySelector('.edit-fixed-expense').addEventListener('click', function() {
                // ملء النموذج بالبيانات الحالية
                document.getElementById('fixed_expense_name').value = fixedExpenseItem.querySelector('input[name="fixed_expense_name[]"]').value;
                document.getElementById('fixed_expense_amount').value = fixedExpenseItem.querySelector('input[name="fixed_expense_amount[]"]').value;
                document.getElementById('fixed_expense_period').value = fixedExpenseItem.querySelector('input[name="fixed_expense_period[]"]').value;
                document.getElementById('fixed_expense_notes').value = fixedExpenseItem.querySelector('input[name="fixed_expense_notes[]"]').value;
                
                // حذف المصروف الثابت الحالي
                fixedExpensesContainer.removeChild(fixedExpenseItem);
                
                // فتح النافذة
                fixedExpenseModal.classList.remove('hidden');
                centerModal(fixedExpenseModal);
            });
            
            // إغلاق النافذة
            fixedExpenseModal.classList.add('hidden');
            
            // تحديث البيانات المالية
            updateFinancialData();
            
            // تحديث شريط التقدم
            updateProgress();
            
            // عرض إشعار نجاح
            showNotification('تم إضافة المصروف الثابت بنجاح');
        });
        
        // إضافة مستمع للنموذج لمنع الإرسال الافتراضي
        fixedExpenseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveFixedExpenseBtn.click();
        });
        
        // إضافة مستمع لحقل المبلغ للتحقق من الإدخال
        const fixedExpenseAmountInput = document.getElementById('fixed_expense_amount');
        if (fixedExpenseAmountInput) {
            fixedExpenseAmountInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9.]/g, '');
            });
        }
    }
}

// ===== إعداد نافذة إضافة المصاريف المتغيرة =====
function setupVariableExpenseModal() {
    const addVariableExpenseBtn = document.getElementById('add-variable-expense-btn');
    const variableExpenseModal = document.getElementById('variable-expense-modal');
    const cancelVariableExpenseBtn = document.getElementById('cancel-variable-expense');
    const saveVariableExpenseBtn = document.getElementById('save-variable-expense');
    const variableExpensesContainer = document.getElementById('variable-expenses-container');
    const variableExpenseForm = document.getElementById('variable-expense-form');
    
    if (addVariableExpenseBtn && variableExpenseModal && cancelVariableExpenseBtn && saveVariableExpenseBtn && variableExpensesContainer && variableExpenseForm) {
        // فتح النافذة
        addVariableExpenseBtn.addEventListener('click', function() {
            // إعادة تعيين النموذج
            variableExpenseForm.reset();
            
            // تعيين التركيز على الحقل الأول
            document.getElementById('variable_expense_name').focus();
            
            // عرض النافذة
            variableExpenseModal.classList.remove('hidden');
            
            // تحريك النافذة إلى المركز
            centerModal(variableExpenseModal);
        });
        
        // إغلاق النافذة
        cancelVariableExpenseBtn.addEventListener('click', function() {
            variableExpenseModal.classList.add('hidden');
        });
        
        // إغلاق النافذة عند النقر خارجها
        variableExpenseModal.addEventListener('click', function(e) {
            if (e.target === variableExpenseModal) {
                variableExpenseModal.classList.add('hidden');
            }
        });
        
        // حفظ المصروف المتغير
        saveVariableExpenseBtn.addEventListener('click', function() {
            const variableExpenseName = document.getElementById('variable_expense_name').value;
            const variableExpenseAmount = document.getElementById('variable_expense_amount').value;
            const variableExpenseUnit = document.getElementById('variable_expense_unit').value;
            const variableExpenseNotes = document.getElementById('variable_expense_notes').value;
            
            if (variableExpenseName.trim() === '') {
                showFieldError('variable_expense_name', 'يرجى إدخال اسم المصروف');
                return;
            }
            
            if (variableExpenseAmount.trim() === '') {
                showFieldError('variable_expense_amount', 'يرجى إدخال قيمة المصروف');
                return;
            }
            
            // إنشاء عنصر المصروف المتغير
            const variableExpenseItem = document.createElement('div');
            variableExpenseItem.className = 'variable-expense-item bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600 mb-3 transition-all hover:shadow-md';
            variableExpenseItem.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-grow">
                        <h4 class="font-medium text-lg">${variableExpenseName}</h4>
                        <div class="flex flex-wrap gap-2 mt-2">
                            <span class="badge badge-primary">${variableExpenseAmount} $ / ${variableExpenseUnit || 'وحدة'}</span>
                        </div>
                        ${variableExpenseNotes ? `<p class="text-gray-600 dark:text-gray-300 mt-2">${variableExpenseNotes}</p>` : ''}
                    </div>
                    <div class="flex items-center">
                        <button type="button" class="edit-variable-expense btn btn-secondary p-1 ml-2" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="remove-variable-expense btn btn-danger p-1 ml-2" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <input type="hidden" name="variable_expense_name[]" value="${variableExpenseName}">
                <input type="hidden" name="variable_expense_amount[]" value="${variableExpenseAmount}">
                <input type="hidden" name="variable_expense_unit[]" value="${variableExpenseUnit}">
                <input type="hidden" name="variable_expense_notes[]" value="${variableExpenseNotes}">
            `;
            
            // إضافة المصروف المتغير إلى الحاوية
            variableExpensesContainer.appendChild(variableExpenseItem);
            
            // إضافة مستمع حدث لزر الحذف
            variableExpenseItem.querySelector('.remove-variable-expense').addEventListener('click', function() {
                // إضافة تأثير الحذف
                variableExpenseItem.classList.add('scale-95', 'opacity-50');
                
                // حذف العنصر بعد التأثير
                setTimeout(() => {
                    variableExpensesContainer.removeChild(variableExpenseItem);
                    updateFinancialData();
                    updateProgress();
                }, 300);
            });
            
            // إضافة مستمع حدث لزر التعديل
            variableExpenseItem.querySelector('.edit-variable-expense').addEventListener('click', function() {
                // ملء النموذج بالبيانات الحالية
                document.getElementById('variable_expense_name').value = variableExpenseItem.querySelector('input[name="variable_expense_name[]"]').value;
                document.getElementById('variable_expense_amount').value = variableExpenseItem.querySelector('input[name="variable_expense_amount[]"]').value;
                document.getElementById('variable_expense_unit').value = variableExpenseItem.querySelector('input[name="variable_expense_unit[]"]').value;
                document.getElementById('variable_expense_notes').value = variableExpenseItem.querySelector('input[name="variable_expense_notes[]"]').value;
                
                // حذف المصروف المتغير الحالي
                variableExpensesContainer.removeChild(variableExpenseItem);
                
                // فتح النافذة
                variableExpenseModal.classList.remove('hidden');
                centerModal(variableExpenseModal);
            });
            
            // إغلاق النافذة
            variableExpenseModal.classList.add('hidden');
            
            // تحديث البيانات المالية
            updateFinancialData();
            
            // تحديث شريط التقدم
            updateProgress();
            
            // عرض إشعار نجاح
            showNotification('تم إضافة المصروف المتغير بنجاح');
        });
        
        // إضافة مستمع للنموذج لمنع الإرسال الافتراضي
        variableExpenseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveVariableExpenseBtn.click();
        });
        
        // إضافة مستمع لحقل المبلغ للتحقق من الإدخال
        const variableExpenseAmountInput = document.getElementById('variable_expense_amount');
        if (variableExpenseAmountInput) {
            variableExpenseAmountInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9.]/g, '');
            });
        }
    }
}

// ===== إعداد حقول الإدخال مع الاقتراحات التلقائية =====
function setupAutocompleteFields() {
    // قائمة المسميات الوظيفية الشائعة
    const commonPositions = [
        'مدير عام',
        'مدير تنفيذي',
        'مدير مالي',
        'مدير تسويق',
        'مدير مبيعات',
        'مدير إنتاج',
        'مدير موارد بشرية',
        'محاسب',
        'مهندس إنتاج',
        'فني صيانة',
        'مشرف إنتاج',
        'مندوب مبيعات',
        'سكرتير',
        'عامل إنتاج',
        'حارس أمن'
    ];
    
    // قائمة المصاريف الثابتة الشائعة
    const commonFixedExpenses = [
        'إيجار المقر',
        'رواتب الموظفين',
        'تأمينات',
        'اشتراك كهرباء',
        'اشتراك مياه',
        'اشتراك إنترنت',
        'اشتراك هاتف',
        'صيانة دورية',
        'رسوم تراخيص',
        'تأمين صحي',
        'إعلانات',
        'محاسب خارجي',
        'استشارات قانونية'
    ];
    
    // قائمة المصاريف المتغيرة الشائعة
    const commonVariableExpenses = [
        'مواد خام',
        'تعبئة وتغليف',
        'شحن وتوصيل',
        'عمولات مبيعات',
        'وقود',
        'كهرباء متغيرة',
        'مياه متغيرة',
        'صيانة طارئة',
        'مستلزمات مكتبية',
        'مستلزمات تنظيف'
    ];
    
    // قائمة وحدات القياس الشائعة
    const commonUnits = [
        'قطعة',
        'كيلوجرام',
        'جرام',
        'لتر',
        'متر',
        'متر مربع',
        'متر مكعب',
        'طن',
        'ساعة',
        'يوم',
        'شهر',
        'سنة',
        'دزينة',
        'عبوة',
        'صندوق'
    ];
    
    // إضافة الاقتراحات التلقائية لحقل المسمى الوظيفي
    const employeePositionInput = document.getElementById('employee_position');
    if (employeePositionInput) {
        setupAutocomplete(employeePositionInput, commonPositions);
    }
    
    // إضافة الاقتراحات التلقائية لحقل المصروف الثابت
    const fixedExpenseNameInput = document.getElementById('fixed_expense_name');
    if (fixedExpenseNameInput) {
        setupAutocomplete(fixedExpenseNameInput, commonFixedExpenses);
    }
    
    // إضافة الاقتراحات التلقائية لحقل المصروف المتغير
    const variableExpenseNameInput = document.getElementById('variable_expense_name');
    if (variableExpenseNameInput) {
        setupAutocomplete(variableExpenseNameInput, commonVariableExpenses);
    }
    
    // إضافة الاقتراحات التلقائية لحقول الوحدات
    const unitInputs = [
        document.getElementById('product_unit'),
        document.getElementById('raw_material_unit'),
        document.getElementById('variable_expense_unit')
    ];
    
    unitInputs.forEach(input => {
        if (input) {
            setupAutocomplete(input, commonUnits);
        }
    });
}

// دالة مساعدة لإعداد الاقتراحات التلقائية
function setupAutocomplete(inputElement, suggestions) {
    // إنشاء عنصر قائمة الاقتراحات
    const autocompleteList = document.createElement('div');
    autocompleteList.className = 'autocomplete-list hidden absolute z-10 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto w-full';
    inputElement.parentNode.style.position = 'relative';
    inputElement.parentNode.appendChild(autocompleteList);
    
    // إضافة مستمع لحدث الإدخال
    inputElement.addEventListener('input', function() {
        const value = this.value.trim().toLowerCase();
        
        // إخفاء القائمة إذا كان الإدخال فارغاً
        if (value === '') {
            autocompleteList.innerHTML = '';
            autocompleteList.classList.add('hidden');
            return;
        }
        
        // تصفية الاقتراحات
        const filteredSuggestions = suggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(value)
        );
        
        // إنشاء عناصر القائمة
        autocompleteList.innerHTML = '';
        
        if (filteredSuggestions.length > 0) {
            filteredSuggestions.forEach(suggestion => {
                const item = document.createElement('div');
                item.className = 'p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer';
                item.textContent = suggestion;
                
                item.addEventListener('click', function() {
                    inputElement.value = suggestion;
                    autocompleteList.classList.add('hidden');
                });
                
                autocompleteList.appendChild(item);
            });
            
            autocompleteList.classList.remove('hidden');
        } else {
            autocompleteList.classList.add('hidden');
        }
    });
    
    // إخفاء القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (e.target !== inputElement) {
            autocompleteList.classList.add('hidden');
        }
    });
    
    // إظهار القائمة عند التركيز
    inputElement.addEventListener('focus', function() {
        if (this.value.trim() !== '') {
            const event = new Event('input');
            this.dispatchEvent(event);
        }
    });
    
    // التنقل بين الاقتراحات باستخدام لوحة المفاتيح
    inputElement.addEventListener('keydown', function(e) {
        const items = autocompleteList.querySelectorAll('div');
        
        if (items.length === 0) return;
        
        let activeIndex = -1;
        
        // تحديد العنصر النشط الحالي
        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains('bg-gray-100') || items[i].classList.contains('dark:bg-gray-700')) {
                activeIndex = i;
                break;
            }
        }
        
        // التنقل باستخدام مفاتيح الأسهم
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            
            // إزالة التحديد من العنصر النشط الحالي
            if (activeIndex >= 0) {
                items[activeIndex].classList.remove('bg-gray-100', 'dark:bg-gray-700');
            }
            
            // تحديد العنصر التالي
            activeIndex = (activeIndex + 1) % items.length;
            items[activeIndex].classList.add('bg-gray-100', 'dark:bg-gray-700');
            
            // تمرير العنصر إلى العرض إذا لزم الأمر
            items[activeIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            
            // إزالة التحديد من العنصر النشط الحالي
            if (activeIndex >= 0) {
                items[activeIndex].classList.remove('bg-gray-100', 'dark:bg-gray-700');
            }
            
            // تحديد العنصر السابق
            activeIndex = (activeIndex - 1 + items.length) % items.length;
            items[activeIndex].classList.add('bg-gray-100', 'dark:bg-gray-700');
            
            // تمرير العنصر إلى العرض إذا لزم الأمر
            items[activeIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault();
            
            // اختيار العنصر النشط
            inputElement.value = items[activeIndex].textContent;
            autocompleteList.classList.add('hidden');
        } else if (e.key === 'Escape') {
            // إغلاق القائمة
            autocompleteList.classList.add('hidden');
        }
    });
}

// ===== إعداد حقول الإدخال مع التحقق المباشر =====
function setupLiveValidation() {
    // التحقق من حقول الأسعار والمبالغ
    const numberInputs = document.querySelectorAll('input[type="number"], input[data-type="number"]');
    
    numberInputs.forEach(input => {
        // إضافة مستمع لحدث الإدخال
        input.addEventListener('input', function() {
            // التحقق من صحة الإدخال
            const value = this.value.trim();
            const isValid = /^[0-9]*\.?[0-9]*$/.test(value);
            
            // إظهار رسالة الخطأ إذا كان الإدخال غير صحيح
            if (!isValid && value !== '') {
                showFieldError(this.id, 'يرجى إدخال قيمة رقمية صحيحة');
            } else {
                hideFieldError(this.id);
            }
        });
        
        // إضافة مستمع لحدث فقدان التركيز
        input.addEventListener('blur', function() {
            // التحقق من الحقل المطلوب
            if (this.hasAttribute('required') && this.value.trim() === '') {
                showFieldError(this.id, 'هذا الحقل مطلوب');
            }
        });
    });
    
    // التحقق من حقول النصوص المطلوبة
    const requiredTextInputs = document.querySelectorAll('input[type="text"][required], textarea[required]');
    
    requiredTextInputs.forEach(input => {
        // إضافة مستمع لحدث فقدان التركيز
        input.addEventListener('blur', function() {
            // التحقق من الحقل المطلوب
            if (this.value.trim() === '') {
                showFieldError(this.id, 'هذا الحقل مطلوب');
            } else {
                hideFieldError(this.id);
            }
        });
    });
}

// دالة مساعدة لإظهار رسالة الخطأ
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    
    if (!field) return;
    
    // إضافة حدود حمراء للحقل
    field.classList.add('border-red-500', 'dark:border-red-500');
    
    // البحث عن رسالة الخطأ الحالية
    let errorElement = field.parentNode.querySelector('.error-message');
    
    // إنشاء عنصر رسالة الخطأ إذا لم يكن موجوداً
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.className = 'error-message text-red-500 text-sm mt-1 animate-fade-in';
        field.parentNode.appendChild(errorElement);
    }
    
    // تعيين رسالة الخطأ
    errorElement.textContent = message;
}

// دالة مساعدة لإخفاء رسالة الخطأ
function hideFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    
    if (!field) return;
    
    // إزالة حدود حمراء من الحقل
    field.classList.remove('border-red-500', 'dark:border-red-500');
    
    // البحث عن رسالة الخطأ وإزالتها
    const errorElement = field.parentNode.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== إعداد حقول الإدخال مع التنسيق التلقائي =====
function setupAutoFormatting() {
    // تنسيق حقول العملة
    const currencyInputs = document.querySelectorAll('input[data-format="currency"]');
    
    currencyInputs.forEach(input => {
        // إضافة مستمع لحدث فقدان التركيز
        input.addEventListener('blur', function() {
            // تنسيق القيمة كعملة
            const value = parseFloat(this.value);
            
            if (!isNaN(value)) {
                this.value = value.toLocaleString('ar-SA', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
        });
        
        // إضافة مستمع لحدث التركيز
        input.addEventListener('focus', function() {
            // إزالة التنسيق عند التركيز
            const value = this.value.replace(/[^\d.-]/g, '');
            this.value = value;
        });
    });
    
    // تنسيق حقول النسب المئوية
    const percentageInputs = document.querySelectorAll('input[data-format="percentage"]');
    
    percentageInputs.forEach(input => {
        // إضافة مستمع لحدث فقدان التركيز
        input.addEventListener('blur', function() {
            // تنسيق القيمة كنسبة مئوية
            const value = parseFloat(this.value);
            
            if (!isNaN(value)) {
                this.value = value.toLocaleString('ar-SA', {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                }) + '%';
            }
        });
        
        // إضافة مستمع لحدث التركيز
        input.addEventListener('focus', function() {
            // إزالة التنسيق عند التركيز
            const value = this.value.replace(/[^\d.-]/g, '');
            this.value = value;
        });
    });
    
    // تنسيق حقول التاريخ
    const dateInputs = document.querySelectorAll('input[data-format="date"]');
    
    dateInputs.forEach(input => {
        // إضافة مستمع لحدث الإدخال
        input.addEventListener('input', function() {
            // تنسيق التاريخ أثناء الكتابة (DD/MM/YYYY)
            let value = this.value.replace(/[^\d]/g, '');
            
            if (value.length > 8) {
                value = value.substring(0, 8);
            }
            
            if (value.length > 4) {
                value = value.substring(0, 4) + '/' + value.substring(4);
            }
            
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            
            this.value = value;
        });
    });
}

// ===== إعداد نظام حفظ البيانات المؤقت =====
function setupAutoSave() {
    // حفظ البيانات تلقائياً كل 30 ثانية
    setInterval(function() {
        saveFormData();
    }, 30000);
    
    // حفظ البيانات عند تغيير أي حقل
    const formElements = document.querySelectorAll('input, textarea, select');
    
    formElements.forEach(element => {
        element.addEventListener('change', function() {
            saveFormData();
        });
    });
    
    // إضافة مستمع لحدث قبل إغلاق الصفحة
    window.addEventListener('beforeunload', function(e) {
        // حفظ البيانات قبل الإغلاق
        saveFormData();
    });
}

// ===== دوال مساعدة =====

// تحريك النافذة المنبثقة إلى المركز
function centerModal(modal) {
    const modalContent = modal.querySelector('.modal-content');
    
    if (modalContent) {
        // إعادة تعيين التحويل
        modalContent.style.transform = 'translate(-50%, -50%)';
        
        // تحديث الموضع
        modalContent.style.top = '50%';
        modalContent.style.left = '50%';
    }
}

// الحصول على نص الفترة
function getPeriodText(period) {
    switch (period) {
        case 'monthly':
            return 'شهرياً';
        case 'quarterly':
            return 'ربع سنوي';
        case 'semi_annually':
            return 'نصف سنوي';
        case 'annually':
            return 'سنوياً';
        default:
            return period;
    }
}

// ===== تصدير الدوال =====
window.setupProductModal = setupProductModal;
window.setupRawMaterialModal = setupRawMaterialModal;
window.setupCompetitorModal = setupCompetitorModal;
window.setupEmployeeModal = setupEmployeeModal;
window.setupFixedExpenseModal = setupFixedExpenseModal;
window.setupVariableExpenseModal = setupVariableExpenseModal;
window.showFieldError = showFieldError;
window.hideFieldError = hideFieldError;
