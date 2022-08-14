import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories:Category[]=[];
  currentCategory:Category;
  rout:String;
  constructor() { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categories=[
      {categoryId:1,categoryName:"Ana Sayfa", categoryCode:"main",categoryIcon:"https://icons.iconarchive.com/icons/uiconstock/dynamic-flat-android/48/home-icon.png" },

      {categoryId:1,categoryName:"Cihazlar", categoryCode:"devices",categoryIcon:"https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/48/Devices-pda-icon.png" },

      {categoryId:2,categoryName:"Müşteriler", categoryCode:"customers", categoryIcon:"https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-13/48/Users-icon.png" },

      {categoryId:3,categoryName:"Marka Model", categoryCode:"brandModels",categoryIcon:"https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-7/48/Bookmark-add-icon.png" },

      {categoryId:4,categoryName:"Ürün Grupları", categoryCode:"groups",categoryIcon:"https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-13/48/Arrows-Meeting-Point-icon.png" },

      {categoryId:5,categoryName:"İstatistikler", categoryCode:"",categoryIcon:"https://icons.iconarchive.com/icons/aha-soft/large-seo/48/SEO-icon.png" },

      {categoryId:6,categoryName:"Raporlar", categoryCode:"",categoryIcon:"https://icons.iconarchive.com/icons/custom-icon-design/flatastic-5/48/Reports-icon.png" },

      {categoryId:7,categoryName:"Ayarlar", categoryCode:"",categoryIcon:"https://icons.iconarchive.com/icons/icojam/blue-bits/48/pinions-settings-icon.png" },
      {categoryId:8,categoryName:"Kullanıcı İşlemleri", categoryCode:"",categoryIcon:"https://icons.iconarchive.com/icons/icojam/blue-bits/48/user-settings-icon.png" },
      {categoryId:9,categoryName:"Admin Panel", categoryCode:"",categoryIcon:"https://icons.iconarchive.com/icons/aha-soft/free-large-boss/48/Admin-icon.png" },
  ];
  }

  setCurrentCategory(category : Category){
    this.rout=category.categoryCode    
    this.currentCategory=category;
  }

}
