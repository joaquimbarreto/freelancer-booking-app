class BookingsController < ApiController

    def index
        @bookings = Booking.all        
    end

    def show
        @booking = Booking.find(params[:id])
    end

    def new

    end

    def create
        
    end

    def edit
        
    end

    def update
        
    end

    def destroy
        
    end

    private

    def booking_params
        params.require(:booking).permit(:freelancer_id, :user_id, :date, :total_cost)
    end

    def find_booking
        @booking = Booking.find(params[:id])
    end

end
