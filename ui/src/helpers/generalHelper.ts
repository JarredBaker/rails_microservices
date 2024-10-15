import ApiService from "../api/authApi";
import {logout} from "../store/userSlice";
import store from '../store';

const GeneralHelper = {
  async callLogout(): Promise<void> {
    await ApiService.logout().then((res) => {
      if (res.status === 200) store.dispatch(logout());
    }).catch((error) => {
      console.error("Failed " + JSON.stringify(error));
    })
  },

  calculateTotal(cents: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(cents / 100);
  }
}

export default GeneralHelper;