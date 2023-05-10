$(document).ready(function(){
    $('.single-option-selector__radio[value="2500mg"]').next().click();
    function changePack() {
        const pack = $('.jc-custom-rc-radio__input:checked').next().find('.jc-custom-rc-radio__pack-item.active').data('pack');
        $('.jc-js-quantity-selector').val(pack);
    }

    function changePlan() {
        const plan = $('.jc-custom-rc-radio__plan-item.active').data('plan');
        $(`.rc_widget__option__plans__dropdown>option:eq(${plan})`).prop('selected', true);
    }

    function formatPrice(p) {
        return p.toFixed(2);
    }

    function changeVariant() {
        var price = Number($('[data-price-onetime]').text().trim().replace('$',''));
        $('.jc-custom-rc__compare-price').text(`$${formatPrice(price)}`);
        $('.jc-custom-onetime').find('[data-pack="1"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price)}`);
        $('.jc-custom-onetime').find('[data-pack="2"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 0.9)}`);
        $('.jc-custom-onetime').find('[data-pack="3"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 0.85)}`);

        $('.jc-custom-subsave').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 0.8)}`);
    }

    $(document).on('change', '.single-option-selector__radio', function(){
        changeVariant();
    });

    $(document).on('click', '.jc-custom-rc-radio__pack-item', function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).closest('.jc-custom-rc-radio__packs').find('.jc-custom-rc-radio__pack-item').removeClass('active');
        $(this).addClass('active');
        changePack();
    });

    $(document).on('click', '.jc-custom-rc-radio__plan-item', function(e){
        e.preventDefault();
        e.stopPropagation();
        $('.jc-custom-rc-radio__plan-item').removeClass('active');
        $(this).addClass('active');
        changePlan();
    });

    $(document).on('change', '.jc-custom-rc-radio__input', function(){
        if ($('.jc-custom-rc-radio__input:checked').val() == 'subsave') {
            $('[data-label-subsave]').click();
        } else {
            $('[data-label-onetime]').click();
        }
        changePack();
    });

    var searchInterval = setInterval(searchElement, 500);
    function stopSearch() {
        clearInterval(searchInterval);
    }

    function searchElement() {
        if($('[data-widget-container-wrapper]').length > 0) {
            $('.jc-custom-rc-container').show();
            stopSearch();
            changeVariant();
            changePack();
            changePlan();
        }
    }
    
    setTimeout(function(){
        stopSearch();
    },60000);
});