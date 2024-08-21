import React from 'react'
import {create}  from 'zustand'

export const useBearStore:any = create((set) => ({
    account: [{ email: '', password: '', subscriptions: [''], profilePicture: '' }, { email: 'test2', password: 'test2', subscriptions: [''], profilePicture: '' }],
    currentUser: null,

    setProfilePicture: (pictureUri: string) => {
        set((state) => {
          const updatedAccount = state.account.map((user) =>
            user.email === state.currentUser?.email ? { ...user, profilePicture: pictureUri } : user
          );
          return {
            account: updatedAccount,
            currentUser: state.currentUser
              ? { ...state.currentUser, profilePicture: pictureUri }
              : null
          };
        });
      },

    deleteAccount: () => {
       const delacc = useBearStore.getState().account.filter((user) => {
       return useBearStore.getState().currentUser !== user 
       }) 
       set({ account: delacc, currentUser: null})
    },

    logout: () => {
        console.log('logs out')
        return{
            currentUser: null
        }
    },

    login: (email, password) => {
      const account = useBearStore.getState().account.find(
        (acc) => acc.email === email && acc.password === password
      );
      if(account){
        set({ currentUser: account});
        return true;
      } return false;
    },

    register: (email, password) => {
        const existingAccount = useBearStore.getState().account.find(
            (acc) => acc.email === email
        );

        if (existingAccount) {
            return false; // Email already taken
        } else {
            set((state) => {
                const newAccount = { email, password, subscriptions: [] };
                return {
                    account: [...state.account, newAccount],
                    currentUser: newAccount
                };
            });
            return true; // Registration successful
        }
    },
    hasSubscription: (subscription) => {
        const account = useBearStore.getState().currentUser
        console.log('Checking sub for', subscription)
        return account ? account.subscriptions.includes(subscription) : false;
        },

    addSubscription: (newSubscription) =>
        set((state) => {
            if(!state.currentUser) return state;

            const updatedUser = {
                ...state.currentUser,
                subscriptions: state.currentUser.subscriptions.includes(newSubscription)
                ? state.currentUser.subscriptions : [...state.currentUser.subscriptions, newSubscription],
            };

            return {
                account: state.account.map((acc) =>
                  acc.email === state.currentUser?.email ? updatedUser : acc
                ),
                currentUser: updatedUser,
            }
        }),

    removeSubscription: (oldSubscription) => {
        set((state) => {
            if(!state.currentUser) return state;

            const updatedUser = {
                ...state.currentUser,
                subscriptions: state.currentUser.subscriptions.filter(
                  (sub) => sub !== oldSubscription
                ),
            };

            return {
                account: state.account.map((acc) => acc.email === state.currentUser?.email ? updatedUser : acc),
                currentUser: updatedUser,
            }
        })
    }

}))

useBearStore.setState(()=>({
    email:'',
    password:''
}))