import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breed } from 'app/models/breed';
import { Dog } from 'app/models/dog';
import { BreedService } from 'app/services/breed.service';
import { DogService } from 'app/services/dog.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DogPhoto } from 'app/models/dog-photo';
import { ImageSnippet } from 'app/models/image-snippet';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadDogPhoto } from 'app/models/upload-dog-photo';

@Component({
  selector: 'app-dog-core-information',
  templateUrl: './dog-core-information.component.html',
  styleUrls: ['./dog-core-information.component.css'],
})
export class DogCoreInformationComponent {
  @Input() dog!: Dog;
  breeds: Breed[] = [];
  dogPhotoRaw = {} as DogPhoto;
  photoName = '';
  photo!: SafeResourceUrl;

  selectedFiles?: FileList;
  currentFile?: File;
  uploadPhoto = {} as UploadDogPhoto;
  progress = 0;
  message = '';
  preview = '';

  imageInfos?: Observable<any>;

  edit: boolean = false;

  constructor(
    private dogService: DogService,
    private route: ActivatedRoute,
    private breedService: BreedService,
    private datePipe: DatePipe,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.dogService.getDogPhoto(this.dog.id ?? 0).subscribe((photo) => {
      this.photoName = photo.imageName;
      this.photo = this._sanitizer.bypassSecurityTrustUrl(photo.imageData);
      console.log(photo.imageData);      
      console.log(this.photo);
    });

    this.breedService.getBreeds().subscribe((breeds) => (this.breeds = breeds));
    this.datePipe.transform(this.dog.dob, 'dd-MM-yyyy');
    this.datePipe.transform(this.dog.startDate, 'dd-MM-yyyy');
  }
  get formattedDate() {
    return this.datePipe.transform(this.dog.dob, 'dd-MM-yyyy');
    return this.datePipe.transform(this.dog.startDate, 'dd-MM-yyyy');
  }

  enableEdit() {
    this.edit = !this.edit;
  }
  editDog(selectedDog: Dog) {
    this.dog = selectedDog;
    this.dogService
      .updateDog(selectedDog)
      .subscribe((dog) => (selectedDog = dog));
    this.edit = false;
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
          this.uploadPhoto.imageData = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  upload(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
        this.uploadPhoto.dogId = this.dog.id ?? 0;
        this.uploadPhoto.imageName = Math.floor(Math.random() * 10) +file.name ;
        console.log(this.uploadPhoto);
        
        

        this.dogService.uploadDogPhoto(this.uploadPhoto).subscribe();
      }
  
      this.selectedFiles = undefined;
    }
  }
}
