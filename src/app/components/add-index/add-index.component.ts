import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-index',
  templateUrl: './add-index.component.html',
  styleUrls: ['./add-index.component.css']
})
export class AddIndexComponent implements OnInit{
  ngOnInit(): void {
    const menuBtn = document.querySelector('.menu-btn') as HTMLElement;
const navigation = document.querySelector('.navigation') as HTMLElement;

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navigation.classList.toggle('active');
});

const btns = document.querySelectorAll('.nav-btn') as NodeListOf<HTMLElement>;
const slides = document.querySelectorAll('.video-slide') as NodeListOf<HTMLElement>;
const contents = document.querySelectorAll('.content') as NodeListOf<HTMLElement>;

const slideNav = (manual: number) => {
    btns.forEach((btn) => {
        btn.classList.remove('active');
    });

    slides.forEach((slide) => {
        slide.classList.remove('active');
    });

    contents.forEach((content) => {
        content.classList.remove('active');
    });

    btns[manual].classList.add('active');
    slides[manual].classList.add('active');
    contents[manual].classList.add('active');
};

btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        slideNav(i);
    });
});
  }

}
