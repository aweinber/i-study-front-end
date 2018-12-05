import { connect } from 'react-redux'
import BillList from '../components/BillList'



const mapStateToProps = (state) => {

    return {

        billList: state.billsApp.bills
    }
};

const BillsContainer = connect(
    mapStateToProps,
)(BillList);



export default BillsContainer;