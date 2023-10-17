import { NgModule } from "@angular/core";


import { MatButtonModule } from '@angular/material/button'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
    imports:[
        MatButtonModule,
        MatAutocompleteModule,
        MatDialogModule
    ],
    exports:[ 
        MatButtonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatSelectModule,
        MatExpansionModule,
    ]
})

export class MaterialModule{}