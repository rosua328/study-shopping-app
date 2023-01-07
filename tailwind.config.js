/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#937DC2",
      },
      backgroundImage: {
        banner: `url('../public/images/banner.jpg')`,
        
        homeList1 : "url('https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        homeList2 : "url('https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        homeList3 : "url('https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        homeList4 : "url('https://images.pexels.com/photos/999303/pexels-photo-999303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
      },
      gridTemplateColumns:{
        layout : 'repeat(auto-fit, 20rem)'
      },
    },
  },
  plugins: [],
};
