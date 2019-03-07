class BookingsController < ApiController
    
    def index
        @bookings = gapi
        render json: @calendar.list_events(@calendar_id)
    end
    
    def new
        
    end
    
    def create
        gapi
        event = Google::Apis::CalendarV3::Event.new({
            start: Google::Apis::CalendarV3::EventDateTime.new(date_time: params[:booking][:start][:dateTime]),
            end: Google::Apis::CalendarV3::EventDateTime.new(date_time: params[:booking][:end][:dateTime]),
            summary: params[:booking][:summary]
          })
        googleRes = @calendar.insert_event(@calendar_id, event)
        render json: googleRes
    end
  
    def destroy
        gapi
        @calendar.delete_event(@calendar_id, params[:booking][:event_id])     
    end

    private
    
    def gapi
        require 'google/apis/calendar_v3'
        scopes =  ["https://www.googleapis.com/auth/calendar"]
        credential_file = File.open("#{Rails.root}/client_secret.json")

        authorizer = Google::Auth::ServiceAccountCredentials.make_creds(json_key_io: credential_file, scope: scopes)
        @calendar = Google::Apis::CalendarV3::CalendarService.new
        @calendar.authorization = authorizer

        # List of calendars that the service account has access to
        calendar_lists = @calendar.list_calendar_lists
        # Example of adding an event to a calender
        @calendar_id = calendar_lists.items.first.id #
    end

end

