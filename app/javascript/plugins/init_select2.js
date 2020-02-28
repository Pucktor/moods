import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';

const initSelect2 = () => {
  $(document).ready(function() {
    $('.select2').select2({
      maximumSelectionLength: 5,
      placeholder: "GENRES",
      width: '100%'
    });
  });
};

export { initSelect2 };
