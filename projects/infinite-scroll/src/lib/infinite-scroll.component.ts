import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';

interface IVerse {
  verse: string;
  content: string;
}

const data: Array<IVerse> = [
  {
    verse: '2 Corinthians 8:21',
    content:
      'For we are taking pains to do what is right, not only in the eyes of the Lord but also in the eyes of man.',
  },
  {
    verse: '2 Timothy 2:15',
    content:
      'Do your best to present yourself to God as one approved, a worker who does not need to be ashamed and who correctly handles the word of truth.',
  },
  {
    verse: 'Colossians 3:9',
    content:
      'Do not lie to each other, since you have taken off your old self with its practices',
  },
  {
    verse: 'Ephesians 4:25',
    content:
      'Therefore each of you must put off falsehood and speak truthfully to your neighbor, for we are all members of one body.',
  },
  {
    verse: 'James 1:26',
    content:
      'Those who consider themselves religious and yet do not keep a tight rein on their tongues deceive themselves, and their religion is worthless.',
  },
  {
    verse: 'James 3:17',
    content:
      'But the wisdom that comes from heaven is first of all pure; then peace-loving, considerate, submissive, full of mercy and good fruit, impartial and sincere.',
  },
  {
    verse: 'Luke 6:31',
    content: 'Do to others as you would have them do to you.',
  },
  {
    verse: 'Matthew 5:8',
    content: 'Blessed are the pure in heart, for they will see God.',
  },
  {
    verse: 'Proverbs 10:9',
    content:
      'Whoever walks in integrity walks securely, but whoever takes crooked paths will be found out.',
  },
  {
    verse: 'Proverbs 11:3',
    content:
      'The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity.',
  },
];

@Component({
  selector: 'lib-infinite-scroll',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  styleUrl: 'infinite-scroll.component.scss',
  templateUrl: 'infinite-scroll.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollComponent {
  public verses: Array<IVerse> = [];
  public showLoading: boolean = false;
  @ViewChild('versesListElementRef', { static: true })
  private _versesListElementRef!: ElementRef<HTMLDivElement>;
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  public loadTrigger: boolean = false;

  ngOnInit(): void {
    this._fetchData();
  }

  private _observeForLastElement(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation: any) => {
        if (
          mutation.addedNodes[0].className.includes('wrapper__scroll-trigger')
        ) {
          const { addedNodes } = mutation;
          this._listenForIntersection(addedNodes[0]);
          observer.disconnect();
        }
      });
    });
    observer.observe(this._versesListElementRef.nativeElement, {
      childList: true,
    });
  }

  private _listenForIntersection(targetELement: HTMLElement): void {
    const observer = new IntersectionObserver(
      (entries) => {
        const [target] = entries;
        if (target?.isIntersecting) {
          this.showLoading = true;
          this.loadTrigger = false;
          this._commonChangeDetector();
          this._fetchData();
        }
      },
      {
        root: this._versesListElementRef.nativeElement,
        threshold: 1,
      }
    );
    observer.observe(targetELement);
  }

  private _fetchData(): void {
    this.showLoading = true;
    setTimeout(() => {
      this._observeForLastElement();
      this.verses = [...this.verses, ...data];
      this.showLoading = false;
      this.loadTrigger = true;
      this._commonChangeDetector();
    }, 2000);
  }

  private _commonChangeDetector(): void {
    this._changeDetectorRef.detectChanges();
  }
}
